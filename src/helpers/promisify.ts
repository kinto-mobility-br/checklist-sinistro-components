/* eslint-disable @typescript-eslint/promise-function-async */

import { type RcFile } from 'antd/es/upload'

const blobTo64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
      resolve(event.target?.result as string)
    }

    reader.onerror = function (event) {
      reject(event)
    }
  })
}

const fileToBlob = (file: RcFile): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function (event) {
      resolve(new Blob([event.target?.result as ArrayBuffer]))
    }

    reader.onerror = function (event) {
      reject(event)
    }
  })
}

const dummy = async (): Promise<void> => {

}

export default {
  blobTo64,
  fileToBlob,
  dummy
}
