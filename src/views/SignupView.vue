<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4 mx-auto">
    <div class="text-center mb-5">
      <!-- <img src="images/blocks/logos/hyper.svg" alt="Image" height="50" class="mb-3"> -->
      <h1 class="text-900 text-3xl font-medium mb-3 mt-0">Create an Account</h1>
    </div>

    <form @submit.prevent="handleSubmit">
      <Message v-if="error" severity="error" :closable="false">{{
        error
      }}</Message>
      <div class="formgrid grid">
        <div class="field col">
          <!-- <label class="text-sm" for="fname">First Name</label> -->
          <InputText
            class="w-full p-inputtext-sm"
            :class="{ 'p-invalid': showFNameErrors }"
            id="fname"
            type="text"
            v-model="state.fname"
            @blur="v$.fname.$touch()"
            placeholder="First Name"
          />
          <small
            v-if="showFNameErrors"
            v-for="error in v$.fname.$silentErrors"
            class="p-error mt-2 block text-xs"
            >{{ error.$message }}</small
          >
        </div>
        <div class="field col">
          <!-- <label class="text-sm" for="lname">Last Name</label> -->
          <InputText
            class="w-full p-inputtext-sm"
            :class="{ 'p-invalid': showLNameErrors }"
            id="lname"
            type="text"
            v-model="state.lname"
            @blur="v$.lname.$touch()"
            placeholder="Last Name"
          />
          <small
            v-if="showLNameErrors"
            v-for="error in v$.lname.$silentErrors"
            class="p-error mt-2 block text-xs"
            >{{ error.$message }}</small
          >
        </div>
      </div>
      <div class="field mb-3">
        <!-- <label class="text-sm" for="email">Email</label> -->
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
        <!-- <label class="text-sm" for="password">Password</label> -->
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
      <div class="field mb-3">
        <!-- <label class="text-sm" for="cpassword">Confirm Password</label> -->
        <InputText
          class="w-full p-inputtext-sm"
          :class="{ 'p-invalid': showCPasswordErrors }"
          id="cpassword"
          type="password"
          v-model="state.cpassword"
          @blur="v$.cpassword.$touch()"
          placeholder="Confirm Password"
        />
        <small
          v-if="showCPasswordErrors"
          v-for="error in v$.cpassword.$silentErrors"
          class="p-error mt-2 block text-xs"
          >{{ error.$message }}</small
        >
      </div>

      <div class="flex flex-column align-items-center mb-4">
        <span class="mb-4">
          Already have an account?
          <router-link
            to="/signin"
            class="font-medium no-underline text-blue-500 text-right cursor-pointer"
            >Sign In</router-link
          >
        </span>
        <Button
          :disabled="v$.$invalid || isLoading"
          type="submit"
          label="Sign Up"
          class="w-full sm:w-6"
        >
          <Loader v-if="isLoading" :isLoading="isLoading" size="small" />
        </Button>
      </div>
      <Divider align="center">
        <span class="text-sm">OR</span>
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
import { useI18n } from 'vue-i18n'
import useVuelidate from '@vuelidate/core'
import {
  helpers,
  required,
  email,
  minLength,
  sameAs,
} from '@vuelidate/validators'

// Local Imports
import Loader from '@/components/Loader.vue'
import { checkSubString } from '@/utils/helpers'
import { useAuthStore } from '@/stores/auth'
export default {
  setup() {
    const authState = useAuthStore()
    const { t } = useI18n()
    // data
    const isLoading = ref(false)
    const error = ref(null)
    const state = reactive({
      fname: '',
      lname: '',
      email: '',
      password: '',
      cpassword: '',
    })

    const validationRules = computed(function () {
      return {
        fname: {
          required: helpers.withMessage(t('fnameRequiredMessage'), required),
        },
        lname: {
          required: helpers.withMessage(t('lnameRequiredMessage'), required),
        },
        email: {
          required: helpers.withMessage(t('emailRequiredMessage'), required),
          email: helpers.withMessage(t('emailValidMessage'), email),
        },
        password: {
          required: helpers.withMessage(t('passwordRequiredMessage'), required),
          minLength: helpers.withMessage(
            t('passwordMinLengthMessage'),
            minLength(8)
          ),
        },
        cpassword: {
          required: helpers.withMessage(
            t('cpasswordRequiredMessage'),
            required
          ),
          sameAs: helpers.withMessage(
            t('cpasswordSameAsMessage'),
            sameAs(state.password)
          ),
        },
      }
    })

    const v$ = useVuelidate(validationRules, state)

    // computed
    const showFNameErrors = computed(function () {
      return v$.value.fname.$dirty && v$.value.fname.$silentErrors.length
    })
    const showLNameErrors = computed(function () {
      return v$.value.lname.$dirty && v$.value.lname.$silentErrors.length
    })
    const showEmailErrors = computed(function () {
      return v$.value.email.$dirty && v$.value.email.$silentErrors.length
    })
    const showPasswordErrors = computed(function () {
      return v$.value.password.$dirty && v$.value.password.$silentErrors.length
    })
    const showCPasswordErrors = computed(function () {
      return (
        v$.value.cpassword.$dirty && v$.value.cpassword.$silentErrors.length
      )
    })

    // methods
    const handleSubmit = async function () {
      isLoading.value = true
      error.value = null
      try {
        const payload = {
          fname: state.fname,
          lname: state.lname,
          email: state.email,
          password: state.password,
        }
        await authState.signupUser(payload);
      } catch (err) {
        if (checkSubString(err.code, 'email-already-in-use')) {
          error.value = t('emailInUseMessage')
        }
      } finally {
        isLoading.value = false
      }
    }

    const handleSocialSignin = async function () {
      try {
        isLoading.value = true
        error.value = null
        await authState.oAuthSignin();
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
      showFNameErrors,
      showLNameErrors,
      showEmailErrors,
      showPasswordErrors,
      showCPasswordErrors,
      isLoading,
      handleSubmit,
      handleSocialSignin,
      error,
    }
  },
  components: {
    Loader,
  }
}
</script>
