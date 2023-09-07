import {useCallback} from 'react'

type useMessageProps={
    text:string,
    classes: string

}
export const useMessage = () => {
    return useCallback(({text, classes}: useMessageProps) => {
        if (window.M && text) {
            window.M.toast({ html: text, classes })
        }
    }, [])
}