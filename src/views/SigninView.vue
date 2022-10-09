<template>
  <div class="row justify-content-center">
    <div class="col-sm-6 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Sign In</h2>
          <form @submit.prevent="handleSubmit">
            <div
              v-if="error"
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {{ error }}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
            <div class="form-group mb-3">
              <input
                class="w-full form-control"
                :class="{ 'is-invalid': showEmailErrors }"
                id="email"
                type="email"
                v-model="state.email"
                @blur="v$.email.$touch()"
                placeholder="Email"
              />
              <div
                v-if="showEmailErrors"
                v-for="error in v$.email.$silentErrors"
                class="invalid-feedback"
              >
                {{ error.$message }}
              </div>
            </div>
            <div class="form-group mb-2">
              <input
                class="w-full form-control"
                :class="{ 'is-invalid': showPasswordErrors }"
                id="password"
                type="password"
                v-model="state.password"
                @blur="v$.password.$touch()"
                placeholder="Password"
              />
              <div
                v-if="showPasswordErrors"
                v-for="error in v$.password.$silentErrors"
                class="invalid-feedback"
              >
                {{ error.$message }}
              </div>
            </div>

            <div class="mb-4">
              <span>
                Don't have an account?
                <router-link
                  to="/signup"
                  class="font-medium no-underline text-blue-500 text-right cursor-pointer"
                  >Sign Up</router-link
                >
              </span>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto mb-4">
              <button
                :disabled="v$.$invalid || isLoading"
                type="submit"
                class="btn btn-primary btn-block d-flex justify-content-center"
              >
                <Loader v-if="isLoading" :isLoading="isLoading" size="small" />
                <span v-else> Sign In </span>
              </button>
            </div>
            <div class="divider my-3">
              <span class="divider-content">OR</span>
            </div>
            <div class="d-flex justify-content-center mt-4">
              <button
                @click="handleSocialSignin"
                type="button"
                label="Continue with Google"
                class="w-full d-flex justify-content-center align-items-center btn btn-light google-signin-btn"
              >
                <img alt="Google sign-in" src="@/assets/img/Google_Logo.png" />
                <span class="ms-2">Continue with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
          password: state.password,
        }
        await authState.signinUser(payload)
      } catch (err) {
        console.log('err', JSON.stringify(err))
        if (
          checkSubString(err.code, 'user-not-found') ||
          checkSubString(err.code, 'wrong-password')
        ) {
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
      handleSubmit,
    }
  },
  components: {
    Loader,
  },
}
</script>
