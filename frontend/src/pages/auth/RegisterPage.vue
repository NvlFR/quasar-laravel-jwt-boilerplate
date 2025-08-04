<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import registerService from '../../services/auth/registerServices';
const $q = useQuasar();
const router = useRouter();
const isLoading = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function onSubmit() {
  if (password.value !== confirmPassword.value) {
    $q.notify({ color: 'negative', message: 'Password tidak cocok!' });
    return;
  }

  isLoading.value = true;

  try {
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    const data = await registerService.register(userData);

    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: data.message || 'Registrasi berhasil! Silakan login.',
    });
    void router.push('/auth/login');
  } catch (error: any) {
    console.error('Registration error:', error);

    const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat registrasi.';

    $q.notify({
      color: 'negative',
      message: errorMessage,
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <q-layout view="hHh lpR fff" style="background: #f5f5f5">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar style="max-width: 980px; margin: 0 auto">
        <q-toolbar-title align="center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <a class="q-pl-md text-white">StaterPos</a>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container style="max-width: 1024px; margin: 20px auto 0">
      <slot></slot>
    </q-page-container>
    <q-page class="row items-center justify-evenly bg-grey-2">
      <q-card class="q-pa-md shadow-2" style="width: 400px; max-width: 90vw">
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Buat Akun Baru</div>
          <div class="text-grey-8">Isi data di bawah ini untuk mendaftar</div>
        </q-card-section>

        <q-form @submit.prevent="onSubmit">
          <q-card-section>
            <q-input
              filled
              v-model="name"
              label="Nama Lengkap"
              lazy-rules
              :rules="[(val: string) => !!val || 'Nama tidak boleh kosong']"
            />
            <q-input
              class="q-mt-md"
              filled
              v-model="email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[(val: string) => !!val || 'Email tidak boleh kosong']"
            />
            <q-input
              class="q-mt-md"
              filled
              v-model="password"
              label="Password"
              type="password"
              lazy-rules
              :rules="[(val: string) => (val && val.length > 5) || 'Password minimal 6 karakter']"
            />
            <q-input
              class="q-mt-md"
              filled
              v-model="confirmPassword"
              label="Konfirmasi Password"
              type="password"
              lazy-rules
              :rules="[
                (val: string) => !!val || 'Konfirmasi password tidak boleh kosong',
                (val: string) => val === password || 'Password tidak cocok',
              ]"
            />
          </q-card-section>

          <q-card-section>
            <q-btn
              label="Registrasi"
              type="submit"
              color="secondary"
              class="full-width"
              icon="login"
              size="lg"
              :loading="isLoading"
              :disable="isLoading"
            />
          </q-card-section>
        </q-form>

        <q-card-section class="text-center q-pt-none">
          <span class="text-grey-8">Sudah punya akun? </span>
          <router-link to="/auth/login" class="text-primary" style="text-decoration: none">
            Login di sini
          </router-link>
        </q-card-section>
      </q-card>
    </q-page>
    <q-footer
      class="q-mt-lg q-mb-md justify-center items-center flex text-grey-6 transparent"
      style="padding: 10px"
    >
      <span>&copy; 2025 - StaterPos v1.0.0</span>
    </q-footer>
  </q-layout>
</template>
