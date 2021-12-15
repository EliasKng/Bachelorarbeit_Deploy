import os
import pandas as pd

# Import XLXS Data
working_dataframe = pd.read_excel(
    os.path.join(".", os.path.dirname(os.path.abspath(__file__)), "data", "FinancialSample.xlsx"),
    engine='openpyxl')


# Takes a dataframe and filters for filter-keywords & aggregates by aggregate parameter (e.g. SUM)
# Possible aggregates: sum mean min max std count
# Other aggregates exist. See
# https://pandas.pydata.org/docs/reference/api/pandas.core.groupby.SeriesGroupBy.aggregate.html
def prepare_dataframe(dataframe, index_row_name, values_row_name, aggregate='mean', filterkeywords=None):
    if aggregate != ("Null" or "null"):
        if filterkeywords:
            if index_row_name == values_row_name:
                df = dataframe.query(" & ".join(
                    '{0} {1} {2}'.format("`" + k + "`", cond[0], (final_prep(cond[1]))) for k, cond in
                    filterkeywords.items()))
                return df[index_row_name].value_counts().rename_axis(index_row_name).reset_index(name='Counts')
            else:
                return pd.pivot_table(dataframe.query(" & ".join(
                    '{0} {1} {2}'.format("`" + k + "`", cond[0], (final_prep(cond[1]))) for k, cond in
                    filterkeywords.items())), index=[index_row_name], values=[values_row_name],
                    aggfunc={values_row_name: aggregate})
        else:
            if index_row_name == values_row_name:
                return dataframe[index_row_name].value_counts().rename_axis(index_row_name).reset_index(
                    name='Counts')
            else:
                return pd.pivot_table(dataframe, index=[index_row_name], values=[values_row_name],
                                      aggfunc={values_row_name: aggregate})


# Falls Zahl, dann returne das erste aus dem Array, falls String, returne den String
def final_prep(input_list):
    if not is_string(input_list[0]):
        return int(input_list[0])
    else:
        return str(input_list)


# überprüft, ob es sich um ein String oder int/float handelt. Gibt True bei String zurück.
def is_string(xstr):
    try:
        int(xstr)
        return False
    except:
        try:
            float(xstr)
            return False
        except:
            return True


print(prepare_dataframe(working_dataframe, 'Country', 'Sales', 'count'))