import type { Icon as PhosphorIcon, IconWeight } from 'phosphor-react-native';
import { CaretRightIcon as CaretRight } from 'phosphor-react-native/src/icons/CaretRight';
import { ClockIcon as Clock } from 'phosphor-react-native/src/icons/Clock';
import { EnvelopeSimpleIcon as EnvelopeSimple } from 'phosphor-react-native/src/icons/EnvelopeSimple';
import { HandWavingIcon as HandWaving } from 'phosphor-react-native/src/icons/HandWaving';
import { HashIcon as Hash } from 'phosphor-react-native/src/icons/Hash';
import { PaperPlaneTiltIcon as PaperPlaneTilt } from 'phosphor-react-native/src/icons/PaperPlaneTilt';
import { SignOutIcon as SignOut } from 'phosphor-react-native/src/icons/SignOut';
import { UserIcon as User } from 'phosphor-react-native/src/icons/User';
import { UsersThreeIcon as UsersThree } from 'phosphor-react-native/src/icons/UsersThree';
import { XIcon as X } from 'phosphor-react-native/src/icons/X';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { FIGMA_ICONS, type FigmaIconName } from './figma-icons';

/** Íconos del UI kit de Figma (prioridad) */
const FIGMA: Record<string, FigmaIconName> = {
  add: 'plus',
  search: 'search',
  chats: 'chats',
  explore: 'communities',
  profile: 'settings',
  back: 'chevronLeft',
  check: 'checkRead',
  lock: 'lock',
  more: 'more',
  attach: 'attach',
  camera: 'camera',
};

/** Íconos que no existen en Figma → Phosphor */
const PHOSPHOR: Record<string, PhosphorIcon> = {
  send: PaperPlaneTilt,
  chevron: CaretRight,
  logout: SignOut,
  clock: Clock,
  hash: Hash,
  close: X,
  mail: EnvelopeSimple,
  person: User,
  group: UsersThree,
  wave: HandWaving,
};

export type IconName =
  | 'add'
  | 'search'
  | 'chats'
  | 'explore'
  | 'profile'
  | 'back'
  | 'check'
  | 'lock'
  | 'more'
  | 'attach'
  | 'camera'
  | 'send'
  | 'chevron'
  | 'logout'
  | 'clock'
  | 'hash'
  | 'close'
  | 'mail'
  | 'person'
  | 'group'
  | 'wave';

type Props = {
  name: IconName;
  size?: number;
  color?: ColorValue;
  /** Solo íconos Phosphor */
  weight?: IconWeight;
  style?: StyleProp<ViewStyle>;
};

export function Icon({ name, size = 24, color = '#0A0A0A', weight = 'regular', style }: Props) {
  const figma = FIGMA[name];
  if (figma) {
    return (
      <View style={style}>
        <SvgXml xml={FIGMA_ICONS[figma]} width={size} height={size} color={color as string} />
      </View>
    );
  }
  const Cmp = PHOSPHOR[name];
  return (
    <View style={style}>
      <Cmp size={size} color={color as string} weight={weight} />
    </View>
  );
}
