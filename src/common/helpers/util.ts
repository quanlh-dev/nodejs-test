import { ColumnOfEntityWithAlias, BaseEntity } from '~common';
import bcrypt from 'bcrypt';
import _, { isNil } from 'lodash';

export function convertEnumToValues(enumType: any): any[] {
    type EnumValueType = [`${typeof enumType}`];
    const values: EnumValueType[] = Object.values(enumType);
    return values;
}

export function genPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
}

export function columnsWithAlias<T extends BaseEntity>(
    tables: ColumnOfEntityWithAlias<T>[],
): string[] {
    return _.concat(
        ...tables.map((table) => {
            if (typeof table.columns === 'string') {
                return [`${table.alias}.${table.columns}`];
            } else if (_.isArray(table.columns)) {
                return table.columns.map(
                    (column) => `${table.alias}.${column as string}`,
                );
            }
        }),
    );
}

export function isEmptyValue(value: any): boolean {
    return value === '' || isNil(value) || isNaN(value);
}

const counter = { value: 0 };

function incrementCounter() {
    return counter.value++;
}

export function generateUniqueId(length: number) {
    // Lấy giá trị timestamp hiện tại theo milliseconds
    const timestamp = Date.now() * 1000; // Chuyển đổi sang microseconds

    // Kết hợp timestamp với giá trị counter để tạo ra ID duy nhất
    const count = incrementCounter();
    const uniqueId = timestamp + count;

    // Đảm bảo chuỗi chỉ có 9 chữ số
    let uniqueIdStr = uniqueId.toString();

    // Nếu dài hơn 9 chữ số, lấy 9 chữ số cuối cùng
    if (uniqueIdStr.length > length) {
        uniqueIdStr = uniqueIdStr.substring(uniqueIdStr.length - length);
    }

    return uniqueIdStr;
}

export const generateUserCode = () => `NV${generateUniqueId(9)}`;
export const generateCustomerCode = () => `KH${generateUniqueId(9)}`;
