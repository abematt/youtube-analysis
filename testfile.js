const {listModels} = require('@huggingface/hub')


async function isModelInferenceEnabled(modelName) {
    const response = await fetch(`https://api-inference.huggingface.co/status/${modelName}`)
    const data = await response.json()
    return data.state == "Loadable"
}

const models = []

async function listModelsAndFilter() {
    for await (const model of listModels({
        credentials: {
            accessToken: token
        },
        search: {
            task: "text-classification",
        }
    })) {
        
        if (model.likes < 200) {
            // console.log("skipping", model.name)
            continue
        } 
        
        if (await isModelInferenceEnabled(model.name)) {
            
            models.push(model)
        }
    }
    console.log(models)
}

listModelsAndFilter();
