package com.jdc.balance.api.member.output;

import java.util.ArrayList;
import java.util.List;

import com.jdc.balance.utils.dto.ChartData;

public record SummaryData(
        List<ChartData> debit,
        List<ChartData> credit,
        List<BalanceData> series
) {

    public int getDebitTotal() {
        return debit.stream().mapToInt(ChartData::value).sum();
    }

    public int getCreditTotal() {
        return credit.stream().mapToInt(ChartData::value).sum();
    }
    
    public static Builder builder() {
    	return new Builder();
    }

    public static class Builder {

        private final List<ChartData> debit = new ArrayList<>();
        private final List<ChartData> credit = new ArrayList<>();
        private final List<BalanceData> series = new ArrayList<>();

        /* ---------- Pie charts ---------- */

        public Builder addDebit(String ledgerName, int amount) {
            debit.add(new ChartData(ledgerName, amount));
            return this;
        }

        public Builder addCredit(String ledgerName, int amount) {
            credit.add(new ChartData(ledgerName, amount));
            return this;
        }

        /* ---------- Line chart ---------- */

        public Builder addSeries(String label, int debit, int credit) {
            series.add(new BalanceData(label, debit, credit));
            return this;
        }

        /* ---------- Build ---------- */

        public SummaryData build() {
            return new SummaryData(
                    List.copyOf(debit),
                    List.copyOf(credit),
                    List.copyOf(series)
            );
        }
    }
}

