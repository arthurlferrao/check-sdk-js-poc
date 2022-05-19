import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes } from '/unico-webframe/UnicoCheckBuilder.min.js'

const RESOURCES_DIRECTORY = "/resources"
const MODELS_PATH = "http://localhost:3000/models"

// Definições de tema para customização do frame de câmera
const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#0384fc")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#dff1f5")
    .setColorText("#0384fc")
    .setBackgroundColorComponents("#0384fc")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#0384fc")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#000")
    .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform:
    translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`)
    .build();

/*
  Criar instancia para câmera.
  Recursos adicionais são necessários com funcionalidades da Facetec.
  Arquivos dos modelos de IA necessários para Câmera Inteligente.
*/
const unicoCamera = new UnicoCheckBuilder()
    .setResourceDirectory(RESOURCES_DIRECTORY)
    .setModelsPath(MODELS_PATH)
    .setTheme(unicoTheme)
    .build()

// Objeto com funções callback para casos de sucesso e erro
const callback = {
    on: {
        success: function(obj) {
            console.log("SuccessPictureResponse", obj.base64)
        },
        error: function(error) {
            console.error("ErrorPictureResponse", error)
        },
        support: function(error) {
            console.error("SupportPictureResponse", error)
        }
    }
}

const startSelfCamera = async (apiKeyPath, cameraType) => {
    const { open } = await unicoCamera.prepareSelfieCamera(apiKeyPath, cameraType)
    open(callback)
}

const startDocumentCamera = async (apiKeyPath, cameraType) => {
    const { open } = await unicoCamera.prepareDocumentCamera(apiKeyPath, cameraType)
    open(callback)
}

const facetecCameraEl = document.getElementById("facetec-camera")
facetecCameraEl.addEventListener("click", () => startSelfCamera("/services.json", SelfieCameraTypes.NORMAL))

const normalCameraEl = document.getElementById("normal-camera")
normalCameraEl.addEventListener("click", () => startSelfCamera("/services-sem-facetec.json", SelfieCameraTypes.NORMAL))

const smartCameraEl = document.getElementById("smart-camera")
smartCameraEl.addEventListener("click", () => startSelfCamera("/services-sem-facetec.json", SelfieCameraTypes.SMART))

const cnhCameraEl = document.getElementById("cnh-camera")
cnhCameraEl.addEventListener("click", () => startDocumentCamera("/services-sem-facetec.json", DocumentCameraTypes.CNH))

const genericDocumentCameraEl = document.getElementById("generic-document-camera")
genericDocumentCameraEl.addEventListener("click", () => startDocumentCamera("/services-sem-facetec.json", DocumentCameraTypes.OTHERS("Other")))