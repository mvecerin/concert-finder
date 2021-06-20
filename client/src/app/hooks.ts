import {useState} from 'react';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToggle = () => {
  const [toggled, setToggle] = useState(false);
  const toggle = () => setToggle(!toggled);

  return [toggled, toggle] as const;
};

export const useForm = <T = void>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  return [
    values,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    setValues,
  ] as const;
};
