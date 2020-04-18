import React, { FC, useRef, ChangeEvent, useState, Children } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Progress from './progress'
import Dragger from './dragger'

import Button, { ButtonType } from '../Button/button'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?:any;
    error?:any;
}

export interface UploadProps {
    action: string;
    defaultFileList?:UploadFile[];
    beforeUpload?: (file:File) => boolean | Promise<File>;
    onProgress?: (percentage:number, file: File) => void;
    onSuccess?: (data:any, file:File) => void;
    onError?:(err:any, file:File) => void;
    onChange?: (file:File) => void;
    onRemove?:(file:UploadFile) => void;
    headers?: {[key:string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?:boolean;
}

export const Upload:FC<UploadProps> = (props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        defaultFileList,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === updateFile.uid) {
                    return {...file,...updateObj}
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files 
        if(!files) {
            return
        }
        uploadFiles(files)
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if(!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if(result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if(result !== false) {
                    post(file)
                }
            }
           
        })
    }
    const post = (file: File) => {
        let _file:UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if(data) {
            Object.keys(data).forEach(key=> {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
              let percentage = Math.round((e.loaded * 100) / e.total) || 0
              if(percentage < 100) {
                  console.log('progess filelist', fileList)
                  updateFileList(_file, { percent: percentage, status: 'uploading'})
                //   setFileList((prevList) => {
                //     console.log('prevList', prevList)
                //     return prevList
                //   })
                  if(onProgress) {
                      onProgress(percentage, file)
                  }
              }
            }
        }).then(res => {
            console.log(res)
            updateFileList(_file, { status: 'success', response: res.data})
            if(onSuccess) {
                onSuccess(res.data, file)
            }
            if(onChange) {
                onChange(file)
            }
        }).catch(err => {
            console.error(err)
            updateFileList(_file, { status: 'error', response: err})
            if(onError) {
                onError(err, file)
            }
            if(onChange) {
                onChange(file)
            }
        })
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) =>{
            return prevList.filter(item => {
                return item.uid !== file.uid
            })
        })
        if(onRemove) {
            onRemove(file)
        }
    }
    console.log('fileList', fileList)
    return (
        <div
            className="viking-upload-component"
            onClick={handleClick}
        >
            {drag ? 
                <Dragger onFile={(files) => {uploadFiles(files)}}>{children}</Dragger>
                : children
            }
            {/* <Button 
                btnType={ButtonType.Primary}
                onClick={handleClick}
            >Upload File</Button> */}
            <input
                className="viking-file-input"
                style={{display: 'none'}}
                type="file"
                ref={fileInput}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}
export default Upload