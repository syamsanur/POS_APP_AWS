<template>
  <div>
    <div class="col-lg mb-4 mt-4">
      <h4>Recent Order</h4>
    </div>
    <div class="col-lg-12 col-12 mt-3">
      <table class="table">
        <thead>
          <tr>
            <th><b>Invoice</b></th>
            <th><b>Cashier</b></th>
            <th><b>Date</b></th>
            <th><b>Order</b></th>
            <th><b>Amount</b></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in itemHistory " :key="index">
            <td>#{{item.id_history}}</td>
            <td>{{item.cashier_history}}</td>
            <td>{{item.date_history}}</td>
            <td>{{item.order_history}}</td>
            <td>{{item.amount_history}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemHistory']
}
</script>

<style scoped>
td{
  color:#CECECE
}
</style>
