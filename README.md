# My Student Portal

**Student:** Abrorbek Saidov  
**Enrolment number:** A85204925029  
**Last four digits:** 5029 (`D1 = 5`, `D2 = 0`, `D3 = 2`, `D4 = 9`)

## Calculated project values

- **P — password minimum length:** `6 + (9 mod 4) = 7`
- **M — name maximum length:** `20 + 5 = 25`
- **S — number of students:** `5 + (2 mod 3) = 7`
- **K — my marks:** `(5 + 0 + 2 + 9) × 4 = 64`
- **T — pass mark:** `40 + 9 = 49`
- **C — accent colour:** `steelblue` (starts with S, the first letter of Saidov)

## About the project

This is a two-page student portal built with HTML, CSS, and plain JavaScript. The registration page validates student details, and the marks board loads student records from a JSON file and allows them to be sorted.

## Running the project

Because the marks board uses `fetch()`, open the project through a local HTTP server instead of opening the HTML file directly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in a browser.

## Reflection

The bug that cost me the most time was making validation work consistently both after leaving a field and when submitting the whole form. I found it by testing each field separately with the browser console open and checking which validation branch ran. With another hour, I would add a filter that lets users display students from one city only.
