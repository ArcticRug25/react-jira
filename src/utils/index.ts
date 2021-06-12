/* eslint-disable react-hooks/exhaustive-deps */
import {
    useState,
    useEffect
} from "react"

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    const result = {
        ...object
    }
    Object.keys(object).forEach(key => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}


export const debounce = (cb: Function, time: number, triggerNow: boolean) => {
    let t: any = null,
        res: any;

    let _debounce: any = (...args: any[]) => {
        console.log(args)
        let self = this;

        if (t) {
            clearTimeout(t);
        }

        if (triggerNow) {
            let exec = !t;

            t = setTimeout(() => {
                t = null
            }, time);

            if (exec) {
                res = cb.apply(self, args)
            }
        } else {
            t = setTimeout(() => {
                res = cb.apply(self, args)
            }, time)
        }

        return res
    }

    _debounce.remove = () => {
        clearTimeout(t);
        t = null;
    }

    return _debounce;
}

export const useDebounce2 = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    // const [time, setTime] = useState(undefined);
    // useEffect(() => {
    //     if (time) {
    //         clearTimeout(time);
    //     }
    //     setTime(setTimeout(() => setDebouncedValue(value), delay))
    // }, [value, delay])

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个useEffect处理完后再运行
        return () => clearTimeout(timeout);
    }, [value, delay])

    return debouncedValue;
}