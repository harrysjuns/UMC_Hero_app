import { useEffect, useState } from "react";

//type ValidateFn<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormProps<T> { // 제네릭 타입 T를 받는 인터페이스\
    initialValues: T; // 폼의 초기 값
    validate: (values: T) => Partial<Record<keyof T, string>>; // 유효성(값이 올바른지) 검사 함수
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // 사용자가 입력 필드에 값을 입력할 때 호출되는 함수
    const handleChange = (name : keyof T, value: string) => {
        setValues({
            ...values, // 불변성 유지 (기존 값 유지) Ex) 이메일을 입력했는데 비밀번호를 입력하면 이메일 값이 사라지는 것을 방지
            [name]: value,
        });
    }

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };
    
    // 프롭스에서 전달된 값을 가져오는 함수
    const getInputProps = (name: keyof T) => {
        const value = values[name]; // 값이 없으면 빈 문자열 반환
        
        const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLAreaElement>) =>
            handleChange(name, (e.target as HTMLInputElement | HTMLTextAreaElement).value);


        const onBlur = () => handleBlur(name); // 포커스가 벗어났을 때 호출되는 함수

        return { 
            // value 가 변경될 때 마다 에러 검증 로직 실행
            // { ...getInputProps("email")} -> email 값이 변경될 때 마다 validate 함수 실행
            // validate 함수는 errors 상태를 업데이트
            // errors 상태가 업데이트 되면 컴포넌트가 다시 렌더링 되고, 최신 에러 메시지가 표시됨
            // 즉, 사용자가 입력 필드에 값을 입력할 때마다 실시간으로 에러 검증이 이루어짐
            // 이로 인해 사용자는 즉각적인 피드백을 받을 수 있음
            // 예를 들어, 이메일 형식이 올바르지 않으면 사용자가 입력하는 즉시 에러 메시지가 표시됨
            // 이를 통해 사용자는 올바른 형식으로 입력할 수 있도록 유도됨
            // 따라서 getInputProps 함수는 단순히 값을 반환하는 것 뿐만 아니라, 사용자 경험을 향상시키는 역할도 함
            // 실시간으로 에러 검증이 이루어지기 때문에 사용자는 입력 과정에서 발생할 수 있는 오류를 즉시 인지하고 수정할 수 있음
            value,
            onChange,
            onBlur,
        };
    };

    useEffect(() => { 
        const newErrors = validate(values);
        setErrors(newErrors as Record<string, string>);
    }, [validate, values]);

    return {
        values,
        errors,
        touched,
        getInputProps,
    };
}

export default useForm;