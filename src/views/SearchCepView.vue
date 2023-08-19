<template> 
    <h5 class="text-center">Buscar Endereços </h5>    
    <q-page padding>
    <q-space />
    <div class="q-mt-lg">
        <q-form class="q-gutter-md">
            
            <q-input
                label="Cep"
                v-model="dados.cep"
                v-mask="'00000-000'"
                @change="buscaCep"
                
            />
            <q-input
                label="Rua"
                v-model="dados.rua"
            
            />
            <q-input
                label="Bairro"
                v-model="dados.bairro"
            
            />
            <q-input    
                label="Cidade"
                v-model="dados.city"
            
            />
            <q-select v-model="dados.uf" :options="options" label="UF" />
            
        </q-form>
    </div>
    </q-page>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar';

export default {
    name: 'SearchCepView',
    setup() {
        const $q = useQuasar();
        const dados = ref({
            cep: '',
            rua: '',
            bairro: '',
            city: '',
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
        
        const buscaCep = () => {
            const meubanco = `http://localhost:8000/api/ceps/${dados.value.cep}`;
            axios.get(meubanco).then((res) => {
                const naoAchouRS = Object.keys(res.data).length === 0;
                if (!naoAchouRS) {
                    console.log('achou');
                    dados.value.cep = res.data.cep;
                    dados.value.bairro = res.data.bairro;
                    dados.value.city = res.data.localidade;
                    dados.value.rua = res.data.logradouro;
                    dados.value.uf = res.data.uf;
                } else {
                    console.log('não achou');
                    const api = `https://viacep.com.br/ws/${dados.value.cep}/json/`;
                    axios.get(api).catch((error) => {
                        console.log(error);
                    })
                    .then((response) => {
                        if (!response.data.erro){
                            dados.value.cep = response.data.cep;
                            dados.value.bairro = response.data.bairro;
                            dados.value.city = response.data.localidade;
                            dados.value.rua = response.data.logradouro;
                            dados.value.uf = response.data.uf;
                            axios.post('http://localhost:8000/api/ceps', dados.value);
                            $q.notify({
                                color: 'green',
                                message: 'Cadastrado na base de dados para próxima consulta.',
                                position: 'top-right'
                            })
                        } else {
                            dados.value = { ...dados }; 
                            $q.notify({
                                color: 'red',
                                message: 'Cep não encontrado',
                                position: 'top-right'
                            })
                        }
                        
                    })
                }    
            });
        }

        return {
            dados,
            options,
            buscaCep,
        }
    },
}
</script>