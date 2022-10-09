<template>
  <div class="row justify-content-center">
    <div class="col-sm-6 col-lg-5">
      <div class="card">
        <div class="card-body">
          <h2 class="text-center mb-4">Create an Account</h2>

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
            <div class="row mb-3">
              <div class="form-group col">
                <!-- <label class="text-sm" for="fname">First Name</label> -->
                <input
                  class="form-control"
                  :class="{ 'is-invalid': showFNameErrors }"
                  id="fname"
                  type="text"
                  v-model="state.fname"
                  @blur="v$.fname.$touch()"
                  placeholder="First Name"
                />
                <div
                  v-if="showFNameErrors"
                  v-for="error in v$.fname.$silentErrors"
                  class="invalid-feedback"
                >
                  {{ error.$message }}
                </div>
              </div>
              <div class="form-group col">
                <!-- <label class="text-sm" for="lname">Last Name</label> -->
                <input
                  class="form-control"
                  :class="{ 'is-invalid': showLNameErrors }"
                  id="lname"
                  type="text"
                  v-model="state.lname"
                  @blur="v$.lname.$touch()"
                  placeholder="Last Name"
                />
                <div
                  v-if="showLNameErrors"
                  v-for="error in v$.lname.$silentErrors"
                  class="invalid-feedback"
                >
                  {{ error.$message }}
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <!-- <label class="text-sm" for="email">Email</label> -->
              <input
                class="form-control"
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
            <div class="form-group mb-3">
              <!-- <label class="text-sm" for="password">Password</label> -->
              <input
                class="form-control"
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
            <div class="form-group mb-3">
              <!-- <label class="text-sm" for="cpassword">Confirm Password</label> -->
              <input
                class="form-control"
                :class="{ 'is-invalid': showCPasswordErrors }"
                id="cpassword"
                type="password"
                v-model="state.cpassword"
                @blur="v$.cpassword.$touch()"
                placeholder="Confirm Password"
              />
              <div
                v-if="showCPasswordErrors"
                v-for="error in v$.cpassword.$silentErrors"
                class="invalid-feedback"
              >
                {{ error.$message }}
              </div>
            </div>

            <div class="mb-4">
              <span>
                Already have an account?
                <router-link
                  to="/signin"
                  class="font-medium no-underline text-blue-500 text-right cursor-pointer"
                  >Sign In</router-link
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
                <span v-else> Sign Up</span>
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
        await authState.signupUser(payload)
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
  },
}
</script>
