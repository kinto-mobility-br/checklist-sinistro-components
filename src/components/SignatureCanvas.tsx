import { Button } from 'antd'
import React, { useRef } from 'react'
import ReactSignatureCanvas from 'react-signature-canvas'
import type SignaturePad from 'signature_pad'

export interface Signature {
  image: string
  dots: SignaturePad.Point[][]
}

export interface OwnProps {
  value?: Signature
  onChange?: (value?: Signature) => void
}

const SignatureCanvas = (props: OwnProps): React.ReactElement => {
  const canvasRef = useRef<ReactSignatureCanvas>()

  const handleChange = (): void => {
    if (props.onChange != null && canvasRef.current != null) {
      props.onChange({
        image: canvasRef.current.toDataURL(),
        dots: canvasRef.current.toData()
      })
    }
  }

  return (
    <div className="signature-pad-workspace">
      <div className="signature-pad-container">
        {/* @ts-expect-error React signature canvas ref conflicts with ref, but it is the same thing */}
        <ReactSignatureCanvas ref={canvasRef}
          clearOnResize={true}
          onEnd={handleChange}/>
      </div>
      <Button onClick={() => canvasRef.current?.clear()}>Limpar Assinatura</Button>
    </div>
  )
}

export default SignatureCanvas
