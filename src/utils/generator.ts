// src/utils/generator.ts
import type { TripType, Temperature, Item } from '../types';
import { uid } from './id';

export function generateDefaultItems(tripType: TripType, temperature: Temperature, durationDays: number): Item[] {
  const items: Item[] = [];
  const add = (name: string) => items.push({ id: uid(), name, done: false });

  // Basis
  ['Paspoort / ID', 'Portemonnee', 'Telefoon + lader', 'EHBO-set', 'Toiletartikelen (mini)'].forEach(add);

  // Kleding - ruwe richtlijn per aantal dagen
 const shirts = Math.min(5, Math.max(1, Math.ceil(durationDays / 2)));
  add(`T-shirts (ongeveer ${shirts}x)`);
  add(`Ondergoed (ongeveer ${shirts}x)`);
  add(`Sokken (ongeveer ${Math.max(1, shirts)} paar)`);

  // Kleding voor Bikepacken
 const fietsbroeken = Math.min(3, Math.max(1, Math.ceil(durationDays / 2)));


  // Specifiek per trip-type
  switch (tripType) {
    case 'beach':
      add('Zwemkleding');
      add('Zonnebrandcrème');
      add('Strandhanddoek');
      add('Zonnebril');
      break;
    case 'bikepack':
      add('Fietshelm');
      add('Multitool / Fietsgereedschap');
      add('Reserve binnenband');
      add('Pomp / CO2-patroon');
      add('Waterdichte zadeltas');
      add('Fietsschoentjes');
      add(`Fietsbroeken (ongeveer ${fietsbroeken}x)`);
      break;
    case 'backpack':
      add('Lichte rugzak');
      add('Slaapzak (lichtgewicht)');
      add('Slaapmat of liner');
      add('Kookstel of brander (optioneel)');
      break;
    case 'city':
      add('Comfortabele schoenen');
      add('Kleine dagrugzak');
      add('Powerbank');
      add('OV-ticket / reismapje');
      break;
    case 'roadtrip':
      add('USB-lader voor in de auto');
      add('Snacks & water');
      add('EHBO + gevarendriehoek');
      break;
    case 'winter':
      add('Thermisch ondergoed');
      add('Warme handschoenen');
      add('Muts / sjaal');
      add('Waterdichte winter schoenen');
      add('Skies / snowboard (optioneel)');
      break;
    case 'hike':
      add('Wandelschoenen');
      add('Waterfles of camelbak');
      add('Hoed / pet');
      break;
    case 'party':
      add('Feestkleding');
      add('Condooms');
        add('Oordoppen');
        break;
    case 'resort':
      add('Zwemkleding');
      add('Zonnebril');
      add('Zonnebrandcrème');
      add('Luchtige kleding');
      break;
    case 'cruise':
      add('Zwemkleding');
      add('Zonnebril');
      add('Zonnebrandcrème');
      add('Cruise-tickets / documenten');
      break;
    case 'camping':
      add('Tent + haringen + scheerlijnen');
      add('Slaapzak');
      add('Luchtbed / matje');
      add('Campingstoel (optioneel)');
      add('Zaklamp / hoofdlamp');
      break;
    case 'culture':
      add('Camera + extra geheugenkaart');
      add('Reisgids / notitieboekje');
      add('Comfortabele wandelschoenen');
      break;
    case 'chill':
      add('Boek / e-reader');
      add('Comfortabele kleding');
      add('Wireless headphones');
      add('wireless speaker');
      break;
    case 'sport':
      add('Sportkleding');
      add('Sportschoenen');
      add('Waterfles');
      add('Handdoek');
      break;
    default:
      add('Extra kleding / materialen voor de activiteit');
  }

  // Temperatuur modifiers
  if (temperature === 'cold') {
    add('Extra warme laag');
    add('Waterdichte jas');
  } else {
    add('Hoed / pet');
    add('Lichte, ademende kleding');
  }

  return items;
}
