<template>
  <div>
    <div class="row">
        <div class="col-lg col-12 mx-auto">
          <div
            class="card align-items-center justify-content-center mb-3 mt-3 "
            id="income"
          >
            <p>Today Income</p>
            <h3>Rp.1.000.000</h3>
            <p>+2% yesterday</p>
          </div>
        </div>
        <div class="col-lg col-12 mx-auto">
          <div
            class="card align-items-center justify-content-center mb-3 mt-3"
            id="order"
          >
            <p>Order</p>
            <h3>3.270</h3>
            <p>+5% Last Week</p>
          </div>
        </div>
        <div class="col-lg col-12 mx-auto">
          <div
            class="card align-items-center justify-content-center mb-3 mt-3"
            id="incomeYear"
          >
            <p>This Year's Income</p>
            <h3>Rp.100.000.000.000</h3>
            <p>+10% Last Year</p>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
#income {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}
#order {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}

#incomeYear {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
</style>
