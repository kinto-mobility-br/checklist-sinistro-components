import { Modal, Upload, type UploadFile, type UploadProps } from 'antd'
import { type RcFile } from 'antd/es/upload'
import React, { useState } from 'react'

import draggerFunctions from '../helpers/draggerFunctions'
import { CanvaOutlined } from './icons'

export interface UploadListProps {
  value?: UploadFile[]
  onChange?: (value?: UploadFile[]) => void
  size: number
  optional?: number
}

const UploadList = (props: UploadListProps): React.ReactElement => {
  const [fileList, setFileList] = useState<UploadFile[]>(props.value ?? [])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const getBase64 = async (file: RcFile): Promise<string> =>
    await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => { resolve(reader.result as string) }
      reader.onerror = (error) => { reject(error) }
    })

  const handleChange: UploadProps['onChange'] = (info) => {
    const { fileList: newFileList } = info
    draggerFunctions.handleImageChange(info, props.size, setFileList)
    if (props.onChange != null) props.onChange(newFileList)
  }

  const handleCancel = (): void => { setPreviewOpen(false) }
  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (file.url == null && file.preview == null && file.originFileObj != null) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url ?? file.preview ?? '')
    setPreviewOpen(true)
    setPreviewTitle(file.name ?? (file.url?.substring(file.url?.lastIndexOf('/') + 1)))
  }

  return (<div className="uploadlist-container">
    <Upload
      fileList={fileList}
      accept=".png,.jpg,.jpeg"
      listType="picture-card"
      onChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onPreview={handlePreview}
      customRequest={draggerFunctions.uploadFile}
      beforeUpload={draggerFunctions.beforeUploadFile}
      multiple={true}
    >
      {
        fileList.length < props.size && (
          <div className={`uploadlist-item-${fileList.length >= props.size - (props.optional ?? 0) ? 'optional' : 'mandatory'}`}>
            <CanvaOutlined />
            <span>PNG e JPEG</span>
          </div>
        )
      }
    </Upload>
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
  </div>)
}

export default UploadList
