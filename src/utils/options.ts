export interface BaseOption {
    value: string;
    label: string;
}

export type Option<T = object> = BaseOption & T;

export const mapToOptions = <T>(
    items: T[],
    labelField: keyof T,
    valueField: keyof T
) => {
    if(!items) return [];
    return items.map(item => ({
        ...item,
        label: String(item[labelField]),
        value: String(item[valueField])
    }))
}