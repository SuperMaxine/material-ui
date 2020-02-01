import { useUtils } from '../_shared/hooks/useUtils';
import { TimePickerToolbar } from './TimePickerToolbar';
import { BaseClockViewProps } from '../views/Clock/ClockView';
import { timePickerDefaultProps } from '../constants/prop-types';
import { ResponsiveWrapper } from '../wrappers/ResponsiveWrapper';
import { pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { ModalWrapper, InlineWrapper, StaticWrapper } from '../wrappers/Wrapper';
import {
  WithDateInputProps,
  WithViewsProps,
  makePickerWithStateAndWrapper,
} from '../Picker/makePickerWithState';

export interface TimePickerProps
  extends BaseClockViewProps,
    WithViewsProps<'hours' | 'minutes' | 'seconds'>,
    WithDateInputProps {}

function useDefaultProps({
  ampm,
  format,
  mask,
  openTo = 'hours',
  views = ['hours', 'minutes'],
}: TimePickerProps) {
  const utils = useUtils();
  const willUseAmPm = ampm ?? utils.is12HourCycleInCurrentLocale();

  return {
    ...timePickerDefaultProps,
    views,
    openTo,
    ampm: willUseAmPm,
    acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
    mask: mask || willUseAmPm ? '__:__ _M' : '__:__',
    format: pick12hOr24hFormat(format, ampm, {
      localized: utils.formats.fullTime,
      '12h': utils.formats.fullTime12h,
      '24h': utils.formats.fullTime24h,
    }),
  };
}

export const TimePicker = makePickerWithStateAndWrapper<TimePickerProps>(ResponsiveWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const DesktopTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(InlineWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const MobileTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(ModalWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});

export const StaticTimePicker = makePickerWithStateAndWrapper<TimePickerProps>(StaticWrapper, {
  useDefaultProps,
  DefaultToolbarComponent: TimePickerToolbar,
});
