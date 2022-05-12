<template>
    <section class="k-sync-language-field" v-if="render">

        <div class="k-field-label">{{ label }}</div>

        <k-button class="da-button" icon="wand" @click="openDialog">
            {{ buttonLabel || 'Synchronise' }}
        </k-button> 

        <k-dialog ref="dialog" size="small">
            
            <div v-if="!success">
                <k-select-field class="mb"
                    v-model="syncFromLanguage"
                    :options="otherLanguages"
                    :required="true"
                    label="Select source language"
                    name="sync_from"
                    help="From which language would you like to synchronise content from?"
                />
                <k-checkboxes-field
                    label="Fields to synchronise"
                    v-model="fieldsToSync"
                    :options="syncableFields"
                />
            </div>
            
            <k-text v-else>
                The content has been synced from <span class="upper">{{ syncFromLanguage }}</span>.
            </k-text>

            <template slot="footer">
                <k-button-group>
                    <k-button icon="cancel" :theme="closeButtonTheme" @click="closeDialog">{{ success ? 'Sluiten' : 'Annuleren'}}</k-button>
                    <k-button v-if="allowSync" icon="play" @click="getContentFromLanguage">Let's GO!</span></k-button>
                </k-button-group>
            </template>
        </k-dialog>

    </section>
</template>

<script>
export default {
    props: {
        label: String,
        buttonLabel: String,
        pageID: String,
        pageFields: Array,
        languages: Array,
        render: Boolean
    },
    data(){ return {
        success: false,
        syncFromLanguage: null,
        fieldsToSync: [],
    }},
    computed: {
        closeButtonTheme() { return this.success ? 'positive' : 'negative' },
        allowSync() { return !this.success && this.syncFromLanguage && this.fieldsToSync.length },
        otherLanguages() {
            return this.languages 
                ? Object.entries(this.languages)
                    .filter(lang => lang[0] !== this.$language.code)
                    .map(lang => { return { value: lang[0], text: lang[1] } })    
                : []
        },
        syncableFields () {
            return this.pageFields.map(field => {
                return { value: field.name, text: field.label }
            })
        }
    },
    mounted() {
        this.pageFields.forEach(field => this.fieldsToSync.push(field.name));
    },
    methods: {
        openDialog() {
            this.success = false
            this.$refs.dialog.open()
        },
        closeDialog() {
            this.$refs.dialog.close()
            this.success = false
        },
        syncFields(fields) {
            console.log(fields)
            try {
                fields.forEach(field => {
                    // if the field name is checked/selected in the dialog 
                    if ( this.fieldsToSync.includes(field.name) ) {
                        this.$store.dispatch("content/update", [field.name, field.value])
                    }
                }) 
            } catch (error) {
                console.error(error);
            }
            this.success = true
            console.log(this.$store.state.content)
        },
        getContentFromLanguage() {
            this.$api
                .post(`sync-lang/${encodeURIComponent(this.pageID)}`, { fromLang: this.syncFromLanguage })
                .then(response => {
                    if (response.success) {
                        this.syncFields(response.content)
                    } else {
                        console.error('Response:', response)
                    }
                })
                .catch(error => console.error(error))
        }
    },
};
</script>


<style scoped>
    .mb {
        margin-bottom: 1.5em
    }
    .da-button {
        border: 1px solid black;
        padding: 0.5em 1.1em 0.65em;
        background: black;
        color: white;
    }
    .upper {
        text-transform: uppercase;
    }
</style>
