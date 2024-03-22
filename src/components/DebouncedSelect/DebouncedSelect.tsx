import React from "react";

import { Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { AxiosResponse } from "axios";
import debounce from "lodash/debounce";

const DebounceSelect = ({
  fetchOptions,
  delectOption,
  debounceTimeout = 800,
  limit = 5,
  ...props
}: Record<string, any>) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<Array<{ label: string; value: any }>>([]);
  const customSpin = <LoadingOutlined style={{ fontSize: 22 }} className={"color__dark"} spin />;

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, limit).then((res: AxiosResponse) => {
        const {
          data: { data },
        }: { data: { data: Record<string, any>[]; attributions: Record<string, any>[] } } = res;

        if (data && data.length) {
          const optionList: Array<{ label: string; value: any }> = data.map((item) => ({
            label: item.name,
            value: item.id,
          }));

          setOptions(optionList);
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
