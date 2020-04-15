<template>
  <div class="container mt-5">
    <div class="text-center">
      <h3>Currency Converter</h3>
      <form>
        <div class="form-group row">
          <label for="from" class="col-sm-2 col-form-label">From:</label>
          <div class="col-sm-10">
            <select
              id="from"
              :placeholder="'Select currency'"
              v-model="from"
              class="form-control"
            >
              <option :value="item.id" v-for="item in List" :key="item.id">{{
                item.id
              }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="to" class="col-sm-2 col-form-label">To:</label>
          <div class="col-sm-10">
            <select
              id="to"
              :placeholder="'Select currency'"
              v-model="to"
              class="form-control"
            >
              <option :value="item.id" v-for="item in List" :key="item.id">{{
                item.id
              }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="amount" class="col-sm-2 col-form-label">Amount:</label>
          <div class="col-sm-10">
            <input
              type="decimal"
              class="form-control"
              id="amount"
              placeholder="Amount to convert"
              v-model="amount"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="amount" class="col-sm-2 col-form-label">Result:</label>
          <div class="col-sm-10">
            <h4 class="result">{{ calculateResult }}</h4>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <input
              type="button"
              class="btn btn-secondary"
              id="button"
              value="Convert"
              @click="ConvertCurrency"
              :disabled="disableButton"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  computed: {
    List() {
      const list = this.ListOfCurrencies.map(r => ({
        id: r.id,
        name: r.currencyName,
        symbol: r.currencySymbol
      }));
      list.sort((a, b) => (a.id < b.id ? -1 : 1));
      return list;
    },
    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(2);
    },
    disableButton() {
      return this.amount === 0 || !this.amount || this.loading;
    }
  },
  data() {
    return {
      currencies: {},
      ListOfCurrencies: [],
      amount: 0,
      from: "ZAR",
      to: "USD",
      result: 0,
      loading: false
    };
  },
  methods: {
    GetListOfCurrencies() {
      this.loading = true;
      axios
        .get(
          "https://free.currconv.com/api/v7/currencies?apiKey=8ee01374a67dc0a10499"
        )
        .then(response => {
          this.loading = false;
          this.currencies = response.data.results;
          this.ListOfCurrencies = Object.values(this.currencies);
        });
    },
    ConvertCurrency() {
      const defaultKey = `${this.from}_${this.to}`;
      this.loading = true;
      axios
        .get(
          `https://free.currconv.com/api/v7/convert?q=${defaultKey}&apiKey=8ee01374a67dc0a10499`
        )
        .then(response => {
          this.loading = false;
          this.result = response.data.results[defaultKey].val;
          // eslint-disable-next-line no-console
          console.log(response.data.results);
        });
    }
  },
  mounted() {
    this.GetListOfCurrencies();
  },
  name: "application",
  watch: {
    from() {
      this.result = 0;
    },
    to() {
      this.result = 0;
    }
  }
};
</script>
<style src="@fortawesome/fontawesome-free/css/all.min.css"></style>
<style scoped>
.form-group {
  width: 50%;
  margin: auto;
  margin-top: 5%;
}
.btn {
  width: 30%;
  margin-left: 30%;
}
.result {
  margin-right: 13%;
}
</style>
