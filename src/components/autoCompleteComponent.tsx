
'use client';
import theme from '@/app/style/theme';
import { Option } from '@/utils/options';
import { CheckBox, CheckBoxOutlineBlank, Close } from '@mui/icons-material';
import {
  Autocomplete,
  AutocompleteCloseReason,
  Checkbox,
  Chip,
  InputLabel,
  MenuItem,
  MenuItemOwnProps,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

interface AutocompleteProps<T extends object> {
  options?: Option<T>[];
  selectedOptions: Option<T>[];
  label?: string;
  maxWidth?: string;
  setSelectedOptions: (options: Option<T>[]) => void;
  disabled?: boolean;
  limitTags?: number;
  required?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClose?: (
    event: React.SyntheticEvent,
    reason: AutocompleteCloseReason,
  ) => void;
}

const StyledInputLabel = styled(InputLabel)(() => ({
  '&.Mui-required': {
    '& .MuiInputLabel-asterisk': {
      color: theme.palette.error.main,
    },
  },
}));

const AutoCompleteComponent = <T extends object>({
  options = [],
  selectedOptions,
  setSelectedOptions,
  label,
  maxWidth,
  onBlur,
  disabled = false,
  limitTags = 2,
  required = false,
  onClose,
}: AutocompleteProps<T>) => {
  const [selectAll, setSelectAll] = useState(false);

  const allOption: Option = { label: 'Todos', value: 'all' };

  const handleChange = (value: Option<T>[]) => {
    if (value.some((option: Option) => option.value === 'all')) {
      setSelectAll(!selectAll);
      setSelectedOptions(selectAll ? [] : options);
    } else {
      setSelectedOptions(value);
      if (value.length === options.length && !selectAll) {
        setSelectAll(true);
      } else if (value.length !== options.length && selectAll) {
        setSelectAll(false);
      }
    }
  };

  const renderItem = (
    optionItem: Option,
    props: MenuItemOwnProps,
    selected: boolean,
  ) => (
    <MenuItem
      {...props}
      key={optionItem.label}
      sx={{
        backgroundColor: selectAll
          ? `${theme.palette.grey[300]} !important`
          : 'transparent',
        '&:hover': {
          backgroundColor: `${theme.palette.grey[300]} !important`,
        },
      }}
    >
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        checked={optionItem.value === 'all' ? selectAll : selected}
      />
      <Typography variant="body2">{optionItem.label}</Typography>
    </MenuItem>
  );

  return (
    <Autocomplete
      multiple
      limitTags={limitTags}
      disableCloseOnSelect
      id="multiple-limit-tags"
      options={options ? [allOption, ...options] : []}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selectedOptions}
      onChange={(event, value) => handleChange(value as Option<T>[])}
      onBlur={(event) => {
        onBlur?.(event);
      }}
      onClose={(event, reason) => {
        onClose?.(event, reason);
      }}
      disablePortal
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={selectedOptions?.length > limitTags ? '...' : ''}
          InputLabelProps={{
            required: required,
            component: StyledInputLabel,
          }}
          sx={{
            '.MuiInputBase-root': {
              height: '3.5rem',
            },
          }}
        />
      )}
      ListboxProps={{
        sx: {
          backgroundColor: theme.palette.grey[200],
        },
      }}
      sx={{ minWidth: maxWidth }}
      renderTags={(value, getTagProps) =>
        value.slice(0, limitTags).map((option, index) => {
          const tagProps = getTagProps({ index });
          return (
            <Chip
              {...tagProps}
              key={option.label}
              label={option.label}
              sx={{
                backgroundColor: theme.palette.grey[100],
                border: `1px solid ${theme.palette.grey[200]}`,
                borderRadius: '0.5rem',
                padding: '0.125rem 0.25rem',
                margin: '0.125rem',
                span: {
                  maxWidth: '7.25rem',
                  fontFamily: 'Fira Sans',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  lineHeight: '1.25rem',
                  color: theme.palette.grey[600],
                },
              }}
              deleteIcon={
                <Close
                  sx={{
                    fill: theme.palette.grey[600],
                    width: '1.125rem',
                    height: '1.125rem',
                  }}
                />
              }
            />
          );
        })
      }
      renderOption={(props, option, { selected }) => {
        return renderItem(option, props, selected);
      }}
    />
  );
};

export default AutoCompleteComponent;
