<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4 mx-auto">
    <div class="text-center mb-5">
      <h1 class="text-900 text-3xl font-medium mb-3 mt-0">Sign In</h1>
    </div>
    <form @submit.prevent="handleSubmit">
      <Message v-if="error" severity="error" :closable="false">{{
        error
      }}</Message>
      <div class="field mb-3">
        <InputText
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': showEmailErrors }"
          id="email"
          type="email"
          v-model="state.email"
          @blur="v$.email.$touch()"
          placeholder="Email"
        />

        <small
          v-if="showEmailErrors"
          v-for="error in v$.email.$silentErrors"
          class="p-error mt-2 block text-xs"
          >{{ error.$message }}</small
        >
      </div>
      <div class="field mb-3">
        <InputText
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': showPasswordErrors }"
          id="password"
          type="password"
          v-model="state.password"
          @blur="v$.password.$touch()"
          placeholder="Password"
        />
        <small
          v-if="showPasswordErrors"
          v-for="error in v$.password.$silentErrors"
          class="p-error mt-2 block text-xs"
          >{{ error.$message }}</small
        >
      </div>

      <div class="flex flex-column align-items-center mb-4">
        <div
          class="flex flex-column sm:flex-row justify-content-between sm:align-items-center mb-4 w-full"
        >
          <div class="flex align-items-center mb-3 sm:mb-0">
            <Checkbox
              id="keepsigned"
              :binary="true"
              v-model="state.checked"
              class="mr-2"
            ></Checkbox>
            <label for="keepsigned">Keep me signed in</label>
          </div>
          <span>
            Don't have an account?
            <router-link
              to="/signup"
              class="font-medium no-underline text-blue-500 text-right cursor-pointer"
              >Sign Up</router-link
            >
          </span>
        </div>

        <Button
          :disabled="v$.$invalid || isLoading"
          type="submit"
          label="Sign In"
          class="w-full sm:w-6"
        >
          <Loader v-if="isLoading" :isLoading="isLoading" size="small" />
        </Button>
      </div>
      <Divider align="center">
        <span>OR</span>
      </Divider>
      <div class="flex justify-content-center mt-4">
        <Button
          @click="handleSocialSignin"
          type="button"
          label="Continue with Google"
          class="w-full justify-content-center sm:w-6 p-button-plain p-button-outlined google-signin-btn"
        >
          <img alt="Google sign-in" src="@/assets/img/Google_Logo.png" />
          <span class="ml-2">Continue with Google</span>
        </Button>
      </div>
    </form>
  </div>
</template>
<script>
import { reactive, computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useI18n } from 'vue-i18n'
import { helpers, required, email } from '@vuelidate/validators'
import { checkSubString } from '@/utils/helpers'
import { useAuthStore } from '@/stores/auth'
import Loader from '@/components/Loader.vue'

export default {
  setup() {
    const authState = useAuthStore()
    const { t } = useI18n()
    // data
    const isLoading = ref(false)
    const error = ref(null)
    const state = reactive({
      email: '',
      password: '',
      checked: false,
    })
    const validationRules = computed(function () {
      return {
        email: {
          required: helpers.withMessage(t('emailRequiredMessage'), required),
          email: helpers.withMessage(t('emailValidMessage'), email),
        },
        password: {
          required: helpers.withMessage(t('passwordRequiredMessage'), required),
        },
      }
    })

    const v$ = useVuelidate(validationRules, state)

    const showEmailErrors = computed(function () {
      return v$.value.email.$dirty && v$.value.email.$silentErrors.length
    })
    const showPasswordErrors = computed(function () {
      return v$.value.password.$dirty && v$.value.password.$silentErrors.length
    })

    // Methods
    const handleSubmit = async function () {
      isLoading.value = true
      error.value = null
      try {
        const payload = {
          email: state.email,
          password: state.password
        }
        await authState.signinUser(payload)
      } catch (err) {
        console.log('err',JSON.stringify(err));;
        if (checkSubString(err.code, 'user-not-found') || checkSubString(err.code, 'wrong-password')) {
          error.value = t('invalidCredentialsMessage')
        }
      } finally {
        isLoading.value = false
      }
    }
    const handleSocialSignin = async function () {
      try {
        isLoading.value = true
        error.value = null
        await authState.oAuthSignin()
      } catch (err) {
        if (checkSubString(err.code, 'popup-closed-by-user')) {
          error.value = t('popupClosedErrorMessage')
        }
      } finally {
        isLoading.value = false
      }
    }

    return {
      state,
      v$,
      showEmailErrors,
      showPasswordErrors,
      error,
      isLoading,
      handleSocialSignin,
      handleSubmit
    }
  },
  components: {
    Loader
  }
}
</script>
