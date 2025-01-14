<template>
  <div class="regs">
    <div class="regs__container">
      <div class="regs_return return">
        <div class="return__container">
          <div
            class="back"
            @click="backToMain()"
          />
        </div>
      </div>
      <div class="regs__account account">
        <div class="account__container">
          <div class="account__left" />
          <div class="account__right">
            <div class="account__avatar">
              <div class="account__image">
                <img
                  src="~assets/img/app/avatar_empty.png"
                  alt=""
                >
              </div>
              <base-btn
                class="account__btn"
                :mode="'red'"
              >
                {{ $t('registration.edit') }}
              </base-btn>
            </div>
            <div class="account__fields">
              <ValidationObserver
                v-slot="{ handleSubmit }"
                tag="div"
                class="fields"
              >
                <form
                  action=""
                  @submit.prevent="handleSubmit(signUp)"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    class="fields__item"
                    tag="div"
                    :name="$t('labels.firstName')"
                    rules="required_if|alpha_spaces"
                  >
                    <label
                      for="firstName"
                      class="fields__text"
                    >
                      {{ $t('labels.firstName') }}
                    </label>
                    <div class="fields__box">
                      <input
                        id="firstName"
                        v-model="model.firstName"
                        type="text"
                        class="fields__text fields__text_input fields__input"
                      >
                      <div class="fields__icon">
                        <img
                          src="~assets/img/ui/user.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      v-if="errors[0]"
                      class="fields__error"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    class="fields__item"
                    tag="div"
                    :name="$t('labels.lastName')"
                    rules="required_if|alpha_spaces"
                  >
                    <label
                      for="lastName"
                      class="fields__text"
                    >
                      {{ $t('labels.lastName') }}
                    </label>
                    <div class="fields__box">
                      <input
                        id="lastName"
                        v-model="model.lastName"
                        type="text"
                        class="fields__text fields__text_input fields__input"
                      >
                      <div class="fields__icon">
                        <img
                          src="~assets/img/ui/user.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      v-if="errors[0]"
                      class="fields__error"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    class="fields__item"
                    tag="div"
                    :name="$t('labels.mail')"
                    rules="required_if|email"
                  >
                    <label
                      for="mail"
                      class="fields__text"
                    >
                      {{ $t('labels.mail') }}
                    </label>
                    <div class="fields__box">
                      <input
                        id="mail"
                        v-model="model.email"
                        autocomplete="username"
                        type="text"
                        class="fields__text fields__text_input fields__input"
                      >
                      <div class="fields__icon">
                        <img
                          src="~assets/img/ui/mail.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      v-if="errors[0]"
                      class="fields__error"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    class="fields__item"
                    tag="div"
                    :name="$t('labels.password')"
                    rules="required_if|min:8"
                  >
                    <label
                      for="password"
                      class="fields__text"
                    >
                      {{ $t('labels.password') }}
                    </label>
                    <div class="fields__box">
                      <input
                        id="password"
                        v-model="model.password"
                        autocomplete="password"
                        type="password"
                        class="fields__text fields__text_input fields__input"
                      >
                      <div class="fields__icon">
                        <img
                          src="~assets/img/ui/password.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div
                      v-if="errors[0]"
                      class="fields__error"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <base-btn
                    :mode="'blue'"
                  >
                    {{ $t('registration.registration') }}
                  </base-btn>
                  <div class="fields__block">
                    Already have an account?
                    <span
                      class="fields__link"
                      @click="doSignIn()"
                    >Sign in</span>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  layout: 'auth',
  data: () => ({
    model: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  }),
  methods: {
    backToMain() {
      this.$router.push('/');
    },
    async signUp() {
      const role = this.$cookies.get('role');
      const payload = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        email: this.model.email,
        password: this.model.password,
      };
      if (role) {
        payload.role = role;
      }
      const response = await this.$store.dispatch('user/signUp', payload);
      if (response?.ok) {
        this.$store.dispatch('main/showInfo', this.$t('meta.confirmEmail'));
        this.$router.push('/sign-in');
      }
    },
    doSignIn() {
      this.$router.push('/sign-in');
    },
  },
};
</script>

<style lang="scss" scoped>
.fields {
  padding-top: 15px;
  max-width: 275px;
  display: grid;
  grid-template-columns: 1fr;
  &__item {
    display: grid;
    grid-template-rows: auto 36px 22px;
  }
  &__text {
    color: #ffffff;
    font-family: 'GothamPro', sans-serif;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    text-transform: uppercase;
    line-height: normal;
  }
  &__input {
    background: transparent;
    border-radius: 17px;
    border: 2px solid #d0d0d0;
    padding-left: 36px;
    width: 100%;
    height: 100%;
    text-transform: initial;
    &::placeholder {
      color: #c7c4c4;
    }
  }
  &__block {
    padding-top: 2px;
    text-align: center;
  }
  &__link {
    font-weight: 600;
    cursor: pointer;
  }
  &__box {
    height: 100%;
    width: 100%;
    position: relative;
  }
  &__icon {
    position: absolute;
    left: 6px;
    top:  5px;
  }
  &__error {
    color: #ffffff;
    display: flex;
    align-items: center;
    font-family: 'GothamPro', sans-serif;
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    line-height: normal;
  }
}

.regs {
  background: url("~assets/img/app/hands.png") center center no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  &__container {
    position: relative;
    min-height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__account {
    background: url("~assets/img/app/account_left.png") no-repeat left center, url("~assets/img/app/account_right.png") no-repeat right top -60px, rgba(#27a860, .9);
    border-radius: 100px;
    min-height: 520px;
    width: 100%;
    max-width: 1000px;
  }
}

.account {
  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &__right {
    padding: 10px 45px;
  }
  &__avatar {
    display: grid;
    grid-template-columns: 82px 85px;
    align-items: flex-end;
    grid-gap: 20px;
  }
}

.return {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: #0c82c3;
  background: linear-gradient(to top, #0c82c3 50%, #1d96dc 50%);
  background-size: 100% 200%;
  background-position: top;
  transition: .5s ease-out;
  &:hover {
    background-position: bottom;
  }
  &__container {
    position: relative;
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding: 30px;
  }
}

.back {
  position: absolute;
  width: 32px;
  height: 32px;
  cursor: pointer;
  &:before {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #FFFFFF;
    transform: rotate(45deg);
  }
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #FFFFFF;
    transform: rotate(-45deg);
  }
}

@include _991 {
  .regs {
    &__account {
      background: url("~assets/img/app/sign-up_bg.png") no-repeat center top, url("~assets/img/app/create_bg_m.png") no-repeat center top 135px, rgba(#27a860, .9);
      display: grid;
      width: initial;
      background-size: contain;
      position: relative;
      margin: 20px 10px;
    }
    &__field {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__container {
      flex-direction: column-reverse;
      display: flex;
      align-items: flex-end;
    }
  }
  .account {
    &__container {
      display: grid;
      grid-template-rows: 212px 1fr;
      grid-template-columns: minmax(340px, 1000px);
    }
    &__left {
      position: relative;
    }
    &__right {
      padding: 0 20px 50px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__btn {
      &_login {
        max-width: initial;
      }
      &_create {
        max-width: initial;
      }
    }
    &__title {
      text-align: center;
    }
    &__items {
      grid-template-columns: repeat(5, 1fr);
    }
    &__fields {
      width: 100%;
      display: flex;
    }
  }
  .fields {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: initial;
    &__remember {
      label {
        font-size: 14px;
      }
    }
    &__item {
      width: 100%;
    }
    &__forgot {
      font-size: 14px;
    }
  }
  .return {
    position: initial;
    width: 75px;
    height: 75px;
    &__container {
      align-items: flex-start;
      padding: 10px;
    }
  }
  .back {
    left: 5px;
    &:before {
      height: 23px;
    }
    &:after {
      height: 23px;
    }
  }
}
</style>
