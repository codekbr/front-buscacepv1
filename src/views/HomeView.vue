<template>
  <div class="q-pa-md example-row-equal-width">
    <div class="row mt-5 q-mb-sm" v-for="value in 3" :key="value">
      <div class="col text-center q-ml-sm" v-for="value in quantidade" :key="value">
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Our Planet</div>
                <div class="text-subtitle2">by John Doe</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>Remove Card</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Send Feedback</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Share</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ lorem }}
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat class="bg-blue text-white text-bold">Editar</q-btn>
            <q-btn flat class="bg-red text-white text-bold">Excluir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  created() {
    const cep = '09290-500';
    const api = `https://viacep.com.br/ws/${cep}/json/`;
    this.axios.get(api).then((response) => {
      console.log(response.data)
    })
  },
  setup() {
    const quantidade = 2;
    return {
      quantidade
    }
  }
  
}
</script>
