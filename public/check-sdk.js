import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes } from '/unico-webframe/UnicoCheckBuilder.min.js'

const RESOURCES_DIRECTORY = "/resources"
const MODELS_PATH = "http://localhost:3000/models"

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

const unicoCameraBuilder = new UnicoCheckBuilder()
unicoCameraBuilder.setResourceDirectory(RESOURCES_DIRECTORY)
unicoCameraBuilder.setModelsPath(MODELS_PATH)
unicoCameraBuilder.setTheme(unicoTheme)

const unicoCamera = unicoCameraBuilder.build()

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

const startSelfCamera = async (cameraType) => {
    const { open } = await unicoCamera.prepareSelfieCamera("/services.json", cameraType)
    open(callback)
}

const startDocumentCamera = async (cameraType) => {
    const { open } = await unicoCamera.prepareDocumentCamera("/services.json", cameraType)
    open(callback)
}

const normalCameraEl = document.getElementById("normal-camera")
normalCameraEl.addEventListener("click", () => startSelfCamera(SelfieCameraTypes.NORMAL))

const smartCameraEl = document.getElementById("smart-camera")
smartCameraEl.addEventListener("click", () => startSelfCamera(SelfieCameraTypes.SMART))

const cnhCameraEl = document.getElementById("cnh-camera")
cnhCameraEl.addEventListener("click", () => startDocumentCamera(DocumentCameraTypes.CNH))

const genericDocumentCameraEl = document.getElementById("generic-document-camera")
genericDocumentCameraEl.addEventListener("click", () => startDocumentCamera(DocumentCameraTypes.OTHERS("Other")))