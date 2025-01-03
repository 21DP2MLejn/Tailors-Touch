// src/types/react-select-country-list.d.ts
declare module 'react-select-country-list' {
    import { OptionsType } from 'react-select';

    const countryList: () => OptionsType<{ label: string; value: string }>;
    export default countryList;
}
