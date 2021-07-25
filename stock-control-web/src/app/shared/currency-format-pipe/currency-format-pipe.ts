import { getLocaleCurrencySymbol } from "@angular/common";
import { Pipe } from "@angular/core";

@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormat {
    transform(value: number, locale: string = 'pt-BR'): any {
        return (
            getLocaleCurrencySymbol(locale) +
            new Intl.NumberFormat(locale, {
                style: 'decimal',
                minimumFractionDigits: 2
            }).format(value)
        );
    }
}