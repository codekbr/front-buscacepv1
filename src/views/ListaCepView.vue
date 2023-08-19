<template>
  <div class="q-pa-md " >
    <q-btn class="bg-blue text-white" @click="dialogNovo = true" > <q-icon name="add" /> Novo Endereço</q-btn>
    <h5 class="text-center">Ceps Cadastrados</h5>
    <div class="row justify-center">
      <div class="col-xs-10 col-sm-5 q-pl-sm q-pb-sm col-md-5 col-lg-3" v-for="(value, index) in displayedRecords" :key="index"> 
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section >
            <div class="row no-wrap">

              <div class="col">
                <div class="text-subtitle2">Cep: {{ value.cep }}</div>
                <div class="text-subtitle2">Rua: {{ value.logradouro }}</div>
                <div class="text-subtitle2">Bairro: {{ value.bairro }}</div>
                <div class="text-subtitle2">Cidade: {{  value.localidade }}</div>
                <div class="text-subtitle2">UF: {{ value.uf }}</div>
                <div class="text-subtitle2"></div>
              </div>
              <div class="col-auto" v-if="false">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>Detalhes</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
         
          <q-separator />
          
          <q-card-actions>
            <q-space/>
            <q-btn flat class="bg-blue text-white text-bold"  @click="dialogEditar = true, editItem(value)">Editar</q-btn>
            <q-btn flat class="bg-red text-white text-bold"  @click="deleteCep({ id: value.id, cep: value.cep})">Excluir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row">
     <div class="col-12">
      <q-btn type="button" @click="loadMore" v-if="hasMoreRecords && !loading" class="bg-teal full-width text-white text-bold q-mt-xl">Carregar Mais</q-btn>
     </div>
    </div>
  </div>
  <div class="q-pa-md q-gutter-sm">
    <MDialog
      :toolbartitle="'Editando Cep: ' + items.cep"
      :showDialog="dialogEditar"
      @close-dialog="dialogEditar = false"
      persistent
    >
      <q-form
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="items.cep"
          label="Cep"
          lazy-rules
          :disable="true"
        />
        <q-input
          filled
          v-model="items.logradouro"
          label="Rua"
          lazy-rules
          :required="required"
          hint="Esse campo é obrigatório *"
        />
        <q-input
          filled
          v-model="items.bairro"
          label="Bairro"
          lazy-rules
          hint="Esse campo é obrigatório *"
        />
          <q-input
          filled
          v-model="items.localidade"
          label="Cidade"
          lazy-rules
          hint="Esse campo é obrigatório *"
        />
         <q-select v-model="items.uf" :options="options" filled hint="Esse campo é obrigatório *" label="UF" />
        <div class="row">
          <q-space/>
          <q-btn label="Salvar" type="button" @click="editarEnderecoExistente(items.id)" color="positive"/>
        </div>
      </q-form>
    </MDialog>
  </div>
  <div class="q-pa-md q-gutter-sm">
    <MDialog
      :toolbartitle="'Novo Endereço'"
      :showDialog="dialogNovo"
      @close-dialog="dialogNovo = false" 
      persistent
    >
    <q-form
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="novo.cep"
          label="Cep"
          lazy-rules
          v-mask="'00000-000'"
          hint="Esse campo é obrigatório *"
        />
        <q-input
          filled
          v-model="novo.rua"
          label="Rua"
          lazy-rules
          hint="Esse campo é obrigatório *"
        />
        <q-input
          filled
          v-model="novo.bairro"
          label="Bairro"
          lazy-rules
          hint="Esse campo é obrigatório *"
        />
          <q-input
          filled
          v-model="novo.city"
          label="Cidade"
          lazy-rules
          hint="Esse campo é obrigatório *"
        />
        <q-select v-model="novo.uf" :options="options" filled hint="Esse campo é obrigatório *" label="UF" />
        <div class="row">
          <q-space/>
          <q-btn label="Salvar" type="button" @click="salvarNovoEndereco()" color="positive"/>
        </div>
      </q-form>
    </MDialog>
  </div>
</template>
<script>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';
import { useQuasar } from 'quasar'
import MDialog from '../components/MDialog.vue'; 
export default {
  name: 'ListaCepView',                        
  components: {
    MDialog
  },                                                           
  setup() {   
    const $q = useQuasar()
    const records = ref([]);
    const displayedRecords = ref([]);
    const currentPage = ref(1);
    const loading = ref(false);
    const dialogNovo = ref(false);
    const dialogEditar = ref(false);
    const items = ref({});
    const novo = ref({
      cep: '',
      city: '',
      bairro: '',
      rua: '',
      uf: '',
    });

    const options = [
      "Selecione",
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MS',
      'MT',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',       
      'SP',
      'SE',
      'TO',
    ];
    const salvarNovoEndereco = async () => {
      axios.post('api/ceps', novo.value)
      .catch(async (error) => {
          console.log(error.response.data.message);
          
          $q.notify({
              color: 'red',
              message: error.response.data.message,
              position: 'top-right'
          })
      }).then(async (res) => {
        await console.log(res);
        if (res){
          $q.notify({
              color: 'green',
              message: 'Endereço Cadastrado com Sucesso !',
              position: 'top-right'
          });
          dialogNovo.value = false;
        }
      });

    }

    const editarEnderecoExistente = (id) => {
      axios.put(`/api/ceps/${id}`, items.value)
      .catch(async (error) => {
          $q.notify({
              color: 'red',
              message: error.response.data.message,
              position: 'top-right'
          })
      }).then(async (res) => {
        console.log('entrou', res);
        if (!res.data.erro){
          $q.notify({
              color: 'green',
              message: 'Endereço Editado com Sucesso !',
              position: 'top-right'
          });
          dialogEditar.value = false;
        }
      });
    }

    onMounted(async () => {
      const initialResponse = await fetchMoreRecords(0);
      records.value = initialResponse.data;
      displayedRecords.value = initialResponse.data.slice(0, 12);
      currentPage.value++;
      loading.value = false;
    }); 
  
    const fetchMoreRecords = async (start) => {
      const response = await axios.get(`/api/ceps?start=${start}`);
      return await response.data;
    };

    const hasMoreRecords = computed(() => {
      return ((displayedRecords.value.length < records.value.length) && !loading.value);
    });

    const loadMore = async () => {
      const response = await fetchMoreRecords(currentPage.value);
      records.value = [...records.value, ...response.data];
      displayedRecords.value = records.value.slice(0, displayedRecords.value.length + 12);
      currentPage.value++;
      loading.value = false;
    };


    const deleteCep  = (async (obj) => {
      $q.dialog({
        dark: false,
        title: 'Confirmar',
        message: `Deseja realmente apagar o cep ${obj.cep} ?`,
        persistent: true,
        style: 'width: 380px; height: 165px',
        ok: {
          label: 'Confirmar',
          color: "green"
        },
        cancel: {
          label: 'Cancelar',
          color: "red"
        }
      }).onOk(async () => {
        const request = await axios.delete(`/api/ceps/${obj.id}`);
        if (request) {
          displayedRecords.value.splice(displayedRecords.value.findIndex(e => e.id === obj.id), 1);
          loading.value =true;
          $q.notify({
            color: 'green',
            message: request.data.success,
            position: 'top-right'
          })
        }
      })
    })

    
    const editItem = (value) => {
      items.value = value;
    };

    return {
      dialogEditar,
      items,
      editItem,
      deleteCep,  
      displayedRecords,
      loadMore,
      hasMoreRecords,
      loading,
      dialogNovo,
      novo,
      options,
      salvarNovoEndereco,
      editarEnderecoExistente
    }
  }
  
}
</script>

<style>
.q-dialog__inner--minimized > div {
  max-width: 1000px !important;
  height: 630px;
}
</style>
