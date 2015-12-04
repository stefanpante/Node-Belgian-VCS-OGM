# Belgian-VCS-OGM (Belgium)
OGM, 'overschrijving met gestructureerde mededeling', is a structured message 
often added to belgian bank transfers to enable automatic processing. 
This Node package enables the generation and validation of these structured messages.

## Installation

```
npm install belgian-vcs-ogm
```

## Usage

```
var ogm = require('belgian-vcs-ogm');
```

## Available Methods

```
isValidOGM(structuredMessage)
```
Checks whether the given structured message is a valid ogm.
Validates the format and the check  digits.

#### Parameters
1. **structuredMessage** *(String)*: structured message to check.

#### Return
*Boolean*: `true` if the structuredMessage is a valid ogm, `false` otherwise.

#### Example
```
ogm.isValidOGM('+++123/1234/12328+++');
// returns true

ogm.isValidOGM('++700/8000/90602+++');
// returns false, wrong structure

ogm.isValidOGM('++++700/8000/90607+++');
// returns false, wrong check digits

ogm.isValidOGM('+++70/0800/10029+++');
// returns false, wrong length
```
<br>
<hr>
<br>

```
generateOGM(numbers)
```

Generates a valid OGM based on the given numbers.

#### Parameters
1. **numbers** *(String|Number)*: Numbers to be used to generate ogm.
Length should be equal to or less than 10. only positive values are allowed.

#### Return
*String*: A valid ogm based on the given numbers. If the length of the numbers
is less than 10, leading zeros are added. Two checkdigits are also added.

#### Example

```
var structuredMessage = ogm.generateOGM('0008000906');
// structuredMessage === '+++000/8000/90655+++'

var structuredMessage = ogm.generateOGM(8000906);
// structuredMessage === '+++000/8000/90655+++'

var structuredMessage = ogm.generateOGM(7008000933);
//structuredMessage === '+++700/8000/93329+++'
```

<br>
<hr>
<br>

```
calculateCheckDigits(numbers)
```
Generates check digits for a given number.
The check digits are equal to remainder of the division of the numeric value of the given numbers
by 97. If the check digits are smaller than 10, a leading zero is added.
If the check digit is equal to 0, 97 is used instead.

#### Parameters
1. **numbers** *(String|Number)*: Numbers to be used to generate checkdigits.
Length should be equal to or less than 10. only positive values are allowed.

#### Return
*String*: The generated check digits
#### Example

```
var checkDigits = ogm.calculateControl(1115532822);
// checkDigits === '36'

var checkDigits = ogm.calculateControl('1115532786');
 // checkDigits === '97'
```

<br>
<hr>
<br>

```
generateRandomOGM()
```
Generates a random structured message.

*DOES NOT PREVENT COLLISION WITH PREVIOUSLY GENERATED VALUES*
#### Parameters
*none*

#### Return
*String*: A randomly generated structured message, conforming to the ogm standard.

#### Example
```
var structuredMessage = ogm.generateRandomOGM();
// output is a valid structuredMessage.
```


```
getStrippedOGM(ogm)
```

strips +'s and /'s from the ogm. returns only the digits.

#### Parameters
1. **ogm** *(String)*: ogm to strip.

#### Return
*String*: Stripped ogm

#### Example

```
var stripped = ogm.getStrippedOGM('+++000/8000/90655+++');
// stripped === '000800090655'
```

<br>
<hr>
<br>
