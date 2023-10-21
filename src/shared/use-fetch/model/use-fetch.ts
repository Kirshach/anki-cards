import { ref, watchEffect, toValue, type Ref } from "vue";

export const useFetch = (
  url: Ref<Parameters<typeof fetch>[0]> | Parameters<typeof fetch>[0],
  options?: Ref<Parameters<typeof fetch>[1]> | Parameters<typeof fetch>[1],
) => {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const fetchData = () => {
    data.value = null;
    loading.value = true;
    error.value = null;

    fetch(toValue(url), toValue(options))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error };
};
