<template>
  <div>
    <b-modal id="detailmodal" title="Product" hide-footer ok-only no-stacking>
      {{item}}a
      <hr/>
      <b-row  class="justify-content-center align-items-center text-center">
        <div class="col-6">
          <b-card
          :img-src="`http://54.165.103.215:3001/${item.image}`"
          style="max-width: 20rem;"
          img-alt="Image"
          no-body
          >
          </b-card>
        </div>
        <div class="col-6">
            <b-card-body class="border">
              <h4><b>{{item.name_product}}</b></h4>
              <h5>{{item.price_product}}</h5>
              <h6 class="">category</h6>
              <div class="row class justify-content-center align-items-center text-center mt-5">
                <div class="row mx-auto text-center">
                  <div class="col-6">
                    <b-btn variant="outline-warning" v-b-modal.editmodal>
                      <b-icon icon="pencil-square"></b-icon>
                    </b-btn>
                  </div>
                  <div class="col-6">
                    <b-btn variant="outline-danger">
                      <b-icon icon="trash"></b-icon>
                    </b-btn>
                  </div>
                </div>
                <!-- <div class="btn btn-warning mr-2 ml-2">Edit</div>
                <div class="btn btn-danger mr-2 ml-2">Hapus</div> -->
              </div>
            </b-card-body>
          </div>
      </b-row>
    </b-modal>
    <EditModal/>
  </div>
</template>

<script>
import EditModal from './EditModal'

export default {
  props: ['item'],
  components: {
    EditModal
  }
}
</script>
