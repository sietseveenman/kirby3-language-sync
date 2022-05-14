<template>
    <section class="k-sync-language-field">

        <div class="k-field-label">{{ label }}</div>

        <k-button class="da-button" :icon="buttonIcon" @click="$refs.dialog.open()">
            {{ buttonLabel || 'Synchronize' }}
        </k-button> 

        <k-dialog ref="dialog" size="small">
            
            <div>
                <k-select-field class="mb"
                    v-model="syncFromLanguage"
                    :options="otherLanguages"
                    :required="true"
                    label="Select source language"
                    name="sync_from"
                    help="From which language would you like to synchronize content from?"
                />
                <k-checkboxes-field
                    label="Fields to synchronize"
                    v-model="fieldsToSync"
                    :options="syncableFields"
                />
                <k-button class="uncheck-button" icon="cancel-small" @click="fieldsToSync = []">
                    Uncheck all
                </k-button> 
                <k-text v-if="failed" class="mt" size="small" style="color: var(--color-negative)">
                    <b>! whoops, something went wrong</b>
                </k-text>
            </div>

            <template slot="footer">
                <k-button-group>
                    <k-button icon="cancel" @click="$refs.dialog.close()">Stop</k-button>
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
        buttonIcon: String,
        pageID: String,
        pageFields: Array,
        languages: Array,
    },
    data(){ return {
        syncFromLanguage: null,
        fieldsToSync: [],
        failed: false
    }},
    computed: {
        allowSync() { return this.syncFromLanguage && this.fieldsToSync.length },
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
        this.pageFields.forEach(field => this.fieldsToSync.push(field.name))
    },
    methods: {
        syncFields(fields) {
            try {
                fields.forEach(field => {
                    if ( this.fieldsToSync.includes(field.name) ) {
                        this.$store.dispatch("content/update", [field.name, field.value])
                    }
                }) 
                this.$refs.dialog.close()
            } catch (error) {
                console.error(error)
                this.failed = true
            }
        },
        getContentFromLanguage() {
            this.$api
                .post(`sync-lang/${encodeURIComponent(this.pageID)}`, { fromLang: this.syncFromLanguage })
                .then(response => {
                    if (response.success) {
                        this.syncFields(response.content)
                    } else {
                        console.error('Response:', response)
                        this.failed = true
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.failed = true
                })
        }
    },
}
</script>


<style>
    .uncheck-button {
        margin-top: 7px;
        margin-left: auto;
        padding: 7px 10px 8px 10px;
        display: block;
    }
    .uncheck-button:hover {
        background: rgb(219, 218, 218);
    }
    .uncheck-button .k-button-text {
        padding-left: 0!important;
    }
</style>
<style scoped>
    .mt {
        margin-top: 1.5em
    }
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
