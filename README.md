# EscooterRent

### Sistemos paskirtis
Projekto tikslas – palengvinti elektrinių paspirtukų nuomininko darbą.

Veikimo principas – platformą sudaro dvi dalys: internetinė aplikaciją, kuria naudosis paspirtukų nuomininkai bei aplikavimo programavimo sąsaja (API).

Nuomininkas, norėdamas naudotis šia platforma pirmiausiai turės prisiregistruoti prie internetinės aplikacijos, toliau galės pridėti paspirtukus, informaciją apie juos kaip dydis, greitis, kaina ar išnuomotas bei galės pridėti informaciją apie nuomininkus kaip lytis, telefonas, kokį paspirtuką šiuo metu išsinuomavęs ir pan.

### Funkciniai reikalavimai

**Neregistruotas sistemos naudotojas galės:**
- Prisiregistruoti
- Prisijungti

**Registruotas sistemos naudotojas galės:**
- Atsijungti nuo internetinės platformos;
- Prisijungti prie internetinės platformos;
- Peržiūrėti laisvus paspirtukus;
- Peržiūrėti visus paspirtukus;
- Peržiūrėti nuomos punktus;
- Išsinuomoti paspirtuką norimam laikui;

**Administratorius galės:**
- Pridėti paspirtuką:
  - Pridėti markę;
  - Pridėti nuvažiuojamą maksimalų atstumą;
  - Pridėti kainą dienai;
  - Pridėti paspirtuko greitį;
  - Pridėti nuomos punktą;
- Pridėti nuomos punktą:
  - Pridėti adresą;
  - Pridėti darbo valandas;
  - Patvirtinti naudotojo registraciją;
  - Išnuomoti paspirtuką;
  - Šalinti naudotojus;
  - Šalinti sugedusius arba netinkamus paspirtukus.

### Sistemos architektūra
**Sistemos sudedamosios dalys:**
- Kliento pusė (ang. Front-end) – naudojantis React.js;
- Serverio pusė (ang. Back-end) – naudojantis .NET core. Duomenų bazė – MySQL.

### Vartotojo sąsaja


## API specifikacija 

### GET RentPoint

Grąžina vieną specifinę nuomos tašką pagal id. 

##### Parametrai

id - nuomos taško id

##### Galimi atsako kodai

```
404 - not found 
200 - OK
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/RentPoint/RentPointsById/1`

##### Atsakymas į pavyzdinę užklausą
 ```
{
  "id": 2,
  "address": "kazkas 1818",
  "city": "Kaunasss"
}
 ```
 
#### GET RentPoints

Grąžina visus nuomos taškus esančias duomenų bazėje.

##### Galimi atsako kodai

```
404 - not found 
200 - OK 
```

##### Užklausos pavyzdys

`(https://localhost:7271/api/RentPoint`

##### Atsakymas į pavyzdinę užklausą

```
[
  {
    "id": 2,
    "address": "kazkas 1818",
     "city": "Kaunasss"
  }
]
```

#### POST RentPoint

Sukuria naują nuomos punktą.

##### Galimi atsako kodai

```
201 - Created
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/RentPoint`

Body:
```
{
  "address": "string",
  "city": "string"
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
  "address": "string",
  "name": "string"
}
```

#### DEL RentPoint

Ištrina specifinį nuomos punktą, nurodytą pagal id.

##### Parametrai

id - nuomos punkto id

##### Galimi atsako kodai

```
404 - not found 
200 - ok
```

##### Užklausos pavyzdys

`https://localhost:7271/api/RentPoint/1`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT RentPoint

Redaguoja specifinį nuomos punktą nurodytą pagal id.

##### Parametrai

id - nuomos punkto id

##### Galimi atsako kodai

```
404 - not found 
200 - OK
```

##### Užklausos pavyzdys

`https://localhost:7271/api/RentPoint/1`

Body:

```
{
  "id": 1,
  "address": "string",
  "city": "string"
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
  "id": 1,
  "address": "string",
  "city": "string"
}
```


#### GET all rentpoints scooters

Grąžina visus specifinio nuomos punkto, nurodyto pagal id, paspirtukus.

##### Parametrai

id - nuomos punkto id

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ElectricScooter/ScootersByRentId/1`

##### Atsakymas į pavyzdinę užklausą

```
[
  {
        "id": 1,
        "brand": "xiaomi",
        "model": "pro1",
        "maxDistance": 20,
        "pricePerDay": 25,
        "maxSpeed": 30,
        "rentPointId": 1
  }
]
```

#### GET scooter

Grąžina vieną paspirtuką pagal paspirtuko id.

##### Parametrai

id - paspirtuko id

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ElectricScooter/ScootersByScooterId/1`

##### Atsakymas į pavyzdinę užklausą

```
{
        "id": 1,
        "brand": "xiaomi",
        "model": "pro1",
        "maxDistance": 20,
        "pricePerDay": 25,
        "maxSpeed": 30,
        "rentPointId": 1
}
```

#### POST Scooter

Sukuria naują paspirtuką.

##### Galimi atsako kodai

```
201 - created 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ElectricScooter/ScootersByScooterId/1`

Body:
```
{
  "title": "string",
  "content": "string"
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
  "brand": "xiaomi",
  "model": "pro1",
  "maxDistance": 20,
  "pricePerDay": 25,
  "maxSpeed": 30,
  "rentPointId": 1
}
```

#### DEL Scooter

Ištrina specifinį paspirtuką.

##### Parametrai

id - paspirtuko id

##### Galimi atsako kodai

```
404 - not found
204 - no content 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ElectricScooter/Scooters/1`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT Scooter

Redaguoja konkretų paspirtuką

##### Parametrai

id - paspirtuko id

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ElectricScooter/Scooters/1`

Body:
```
{
  "id": 1,
  "brand": "string",
  "model": "string",
  "maxDistance": 0,
  "pricePerDay": 0,
  "maxSpeed": 0,
  "rentPointId": 1
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
  "id": 1,
  "brand": "string",
  "model": "string",
  "maxDistance": 0,
  "pricePerDay": 0,
  "maxSpeed": 0,
  "rentPointId": 1
}
```

#### GET all specifications

Grąžina visas specifikacijas

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ScooterSpecification`

##### Atsakymas į pavyzdinę užklausą

```
[
    {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
]
```

#### GET specification

Grąžina vieną specifikaciją.

##### Parametrai

id - specifikacijos id

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ScooterSpecification/SpecificationsById/1`

##### Atsakymas į pavyzdinę užklausą

```
    {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
```

#### POST specification

Sukuria naują specifikaciją.

##### Galimi atsako kodai

```
401 - unauthorized
201 - created 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ScooterSpecification`

Body:
```
    {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
```

##### Atsakymas į pavyzdinę užklausą

```
{
    {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
}
```

#### DEL specification

Ištrina komentarą.

##### Parametrai

id - specifikacijos id

##### Galimi atsako kodai

```
404 - not found
204 - no content 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ScooterSpecification/1`

##### Atsakymas į pavyzdinę užklausą

{}

#### PUT Specification

Redaguoja specifinę specifikaciją.

##### Parametrai

id - specifikacijos id

##### Galimi atsako kodai

```
404 - not found
200 - OK 
``` 

##### Užklausos pavyzdys

`https://localhost:7271/api/ScooterSpecification/9`

Body:
```
{
      {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
}
```

##### Atsakymas į pavyzdinę užklausą

```
{
    {
        "id": 1,
        "specificationName": "string",
        "description": "string",
        "electricScooterId": 1
    }
}
```
