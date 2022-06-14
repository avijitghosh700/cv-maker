import React from "react";

import { Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import debounce from "lodash/debounce";

const DebounceSelect = ({
  fetchOptions,
  delectOption,
  debounceTimeout = 800,
  limit = 5,
  ...props
}: Record<string, any>) => {
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<Array<{ label: string; value: any }>>([]);

  const fetchRef = React.useRef(0);

  const customSpin = <LoadingOutlined style={{ fontSize: 22 }} className={"color__dark"} spin />;

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      setOptions([]);
      setFetching(true);

      fetchOptions(value, limit).then((newOptions: any) => {
        const data: Record<string, any>[] = newOptions?.data;

        if (fetchId !== fetchRef.current) return;

        if (data && data.length) {
          const optionList: Array<{ label: string; value: any }> = data.map((item) => ({
            label: item.name,
            value: item.id,
          }));

          setOptions(optionList);
          console.log(newOptions, optionList);
        }

        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onDeselect={(value: any) => console.log(value)}
      options={options}
      notFoundContent={
        fetching ? (
          <>
            Loading...
            <Spin className="ms-1" size="small" indicator={customSpin} />
          </>
        ) : null
      }
      {...props}
    />
  );
};

export default DebounceSelect;
