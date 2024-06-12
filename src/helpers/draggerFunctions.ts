import Upload, { type DraggerProps, type RcFile, type UploadChangeParam, type UploadFile } from 'antd/es/upload'
import imageCompression from 'browser-image-compression'

import promisify from './promisify'
import { message } from 'antd'

const handleImageChange = (info: UploadChangeParam<UploadFile>, max: number, setter: React.Dispatch<React.SetStateAction<UploadFile[]>>): void => {
  let newFileList = [...info.fileList]

  newFileList = newFileList.slice(-max)

  setter(newFileList)
}

const uploadFile: DraggerProps['customRequest'] = (options) => {
  if ((options.file as RcFile).name.match(/\.(png|jpeg|jpg)/g) == null) {
    return options.onError?.(new Error('Tipo inválido! São aceitos apenas arquivos png, jpg e jpeg!'))
  }

  promisify.dummy().then(() => {
    return options.onSuccess?.('ok')
  }).catch((err: Error) => options.onError?.(err))
}

const beforeUploadFile: DraggerProps['beforeUpload'] = async (file) => {
  const isImage = ['image/png', 'image/jpeg'].includes(file.type)
  if (!isImage) {
    await message.error(`${file.name} deve ser um arquivo de imagem! (PNG ou JPG)`)
    return false || Upload.LIST_IGNORE
  }

  const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 650
  })

  return compressed
}
export default {
  handleImageChange,
  uploadFile,
  beforeUploadFile
}
