# Testování a volba postupu: malé porovnání algoritmů v JavaScriptu

## A) Funkce „součet kladných“

### Implementace
Funkce `sumPositive` vrací součet všech kladných čísel v poli.

### Pravidla
- **Nula (0)**: Nula není kladné číslo, proto se do součtu nezapočítává.
- **Nečíselné hodnoty**: Nečíselné hodnoty (řetězce, null, undefined) se ignorují.
- **Prázdné pole**: Vrací 0.
- **Neplatný vstup**: Pokud vstup není pole, vrací 0.

### Testy
Všechny testy prošly úspěšně (8/8):
- Prázdné pole
- Jen záporná čísla
- Smíšená kladná a záporná
- Velká čísla
- Delší pole
- Pole s nulami
- Pole s nečíselnými hodnotami
- Pole obsahující jen nuly

## B) Dvojí řešení „odstranění duplicit“

### Implementace

**Varianta 1 - List-based (includes)**: Prochází pole a kontroluje, zda prvek už není v výsledném seznamu pomocí `includes()`.

**Varianta 2 - Set-based**: Používá JavaScript `Set` pro automatické odstranění duplicit.

### Výsledky benchmarku

| Velikost vstupu | Metoda | Průměrný čas (ms) | Min (ms) | Max (ms) |
|----------------|--------|-------------------|----------|----------|
| ~1 000 prvků | List-based | 0.563 | 0.428 | 1.038 |
| ~1 000 prvků | Set-based | 0.049 | 0.036 | 0.088 |
| ~50 000 prvků | List-based | 3286.981 | 3263.870 | 3322.695 |
| ~50 000 prvků | Set-based | 3.664 | 3.524 | 4.056 |

**Zrychlení Set-based oproti List-based:**
- Při ~1 000 prvcích: **11.49x rychleji**
- Při ~50 000 prvcích: **897.10x rychleji**

## C) Zjištění a zlepšení

### Volba varianty pro odstranění duplicit

**Doporučení: Použít Set-based variantu**

**Důvody:**
1. **Výrazně lepší výkon**: Set-based varianta je výrazně rychlejší, zejména na větších datech. Při 50 000 prvcích je téměř 900x rychlejší.
2. **Škálovatelnost**: Zatímco list-based varianta má kvadratickou složitost O(n²) kvůli `includes()`, Set-based má lineární složitost O(n).
3. **Čitelnost kódu**: Set-based varianta je kratší a jasnější.
4. **Nativní podpora**: JavaScript `Set` je optimalizovaná nativní struktura.

**Kdy použít list-based variantu:**
- Pouze pro velmi malá pole (< 100 prvků), kde je rozdíl zanedbatelný
- Pokud potřebujete zachovat pořadí prvků (Set to zachovává, ale je to dobré zmínit)
- Pokud pracujete v prostředí bez podpory Set (velmi staré prohlížeče)

### Zlepšení funkce sumPositive

**Problém:**
Původní implementace nemusela správně zpracovat všechny hraniční případy, zejména nečíselné hodnoty a neplatné vstupy.

**Úpravy:**
1. **Ošetření neplatného vstupu**: Přidána kontrola, zda je vstup skutečně pole pomocí `Array.isArray()`.
2. **Zpracování nečíselných hodnot**: Přidána konverze pomocí `Number()` a kontrola `isNaN()`, aby se nečíselné hodnoty ignorovaly místo vyvolání chyby.
3. **Robustní zpracování**: Funkce nyní bezpečně zpracuje null, undefined, řetězce a další nečíselné typy.

**Ověření:**
Všechny testy (včetně testů s nečíselnými hodnotami) prošly úspěšně. Funkce správně zpracovává všechny hraniční případy a vrací očekávané výsledky.

## Spuštění

```bash
# Spustit testy
npm test
# nebo
node test.js

# Spustit benchmark
npm run benchmark
# nebo
node benchmark.js
```
