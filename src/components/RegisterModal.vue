<template>
  <div>
    <b-modal id="registermodal" title="Register" hide-footer>
      <!-- {{this.form.email_users}} {{this.form.password_users}} -->
      <b-form @submit.prevent="onRegister()">
        <b-form-group label-cols="4" label="Enter Email">
          <b-form-input v-model="form.email_users" required type="email"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label="Enter Password">
          <b-form-input v-model="form.password_users" required type="password"></b-form-input>
        </b-form-group>
        <div class="col float-right mt-4">
          <div class="row">
            <div class="col">
              <button class="btn btn-danger btn-block ml-2 mr-2" @click="hideModal()">Cancel</button>
            </div>
            <div class="col">
              <!-- <button class="btn btn-primary btn-block ml-2 mr-2" @click="addProduct($event)">Add</button> -->
              <b-button type="submit" variant="primary" block class="ml-2 mr-2">Submit</b-button>
            </div>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email_users: '',
        password_users: ''
      }
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('registermodal')
      this.form.email_users = ''
      this.form.password_users = ''
    },
    onRegister () {
      this.actionRegister(this.form)
        .then((response) => {
          alert(response)
          this.$bvModal.hide('registermodal')
        })
        .catch((err) => {
          alert(err)
          this.$bvModal.hide('registermodal')
        })
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>
