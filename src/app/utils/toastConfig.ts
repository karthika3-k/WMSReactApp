import {toast, ToastOptions} from 'react-toastify'


const toastOptions:ToastOptions={
    position:'bottom-right',
    autoClose:2500,
    hideProgressBar:false,
    closeOnClick:true,
    rtl:false,
    draggable:true,
    pauseOnHover:true,
    style:{
        whiteSpace:'nowrap',
        width:'fit-content'
    },
};

export const showSuccessToast=(message:string)=>{
    toast.success(message, toastOptions);
};

export const showErrorToast=(message:string)=>{
 toast.error(message, toastOptions);
};

export const showInfoToast=(message:string)=>{
 toast.info(message, toastOptions);
};

export const showWarningToast=(message:string)=>{
 toast.warn(message, toastOptions);
};