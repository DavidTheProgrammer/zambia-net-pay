def calculate_napsa(gross_pay):
    """Calculates NAPSA at 5% with the 2017 ceiling of K796.60."""
    napsa_rate = 0.05
    napsa_ceiling = 796.60
    contribution = gross_pay * napsa_rate
    return min(contribution, napsa_ceiling)

def calculate_paye(taxable_income):
    """Calculates PAYE based on the 2026 Zambian Tax Bands."""
    tax = 0
    if taxable_income <= 5100:
        tax = 0
    elif taxable_income <= 7100:
        tax = (taxable_income - 5100) * 0.20
    elif taxable_income <= 9200:
        tax = (800 * 0.20) + (taxable_income - 7100) * 0.30
    else:
        tax = (800 * 0.25) + (2100 * 0.30) + (taxable_income - 9200) * 0.37
    return tax

def main():
    print("--- David's Net Pay Calculator (2026 Standards) ---")
    
    try:
        gross_pay = float(input("Enter Monthly Gross Pay (ZMW): "))
        retirement_rate = float(input("Enter Retirement Contribution % (e.g., 5 for 5%): "))
        
        # 1. Calculate Deductions
        napsa = calculate_napsa(gross_pay)
        
        # Taxable income is usually Gross minus NAPSA (Zambian Tax Law)
        taxable_income = gross_pay - napsa
        paye = calculate_paye(taxable_income)
        
        # 2. Calculate Retirement Contribution (Private/Internal)
        retirement_deduction = gross_pay * (retirement_rate / 100)
        
        # 3. Calculate Net Pay
        total_deductions = napsa + paye + retirement_deduction
        net_pay = gross_pay - total_deductions
        
        # Display Results
        print("\n" + "="*40)
        print(f"{'PAYSLIP SUMMARY':^40}")
        print("="*40)
        print(f"Gross Pay:                ZMW {gross_pay:,.2f}")
        print(f"NAPSA Contribution:       ZMW {napsa:,.2f}")
        print(f"PAYE (Tax):               ZMW {paye:,.2f}")
        print(f"Retirement Savings:       ZMW {retirement_deduction:,.2f}")
        print("-" * 40)
        print(f"TOTAL DEDUCTIONS:         ZMW {total_deductions:,.2f}")
        print(f"NET TAKE-HOME PAY:        ZMW {net_pay:,.2f}")
        print("="*40)
        print(f"Annual Retirement Projection: ZMW {retirement_deduction * 12:,.2f}")
        
    except ValueError:
        print("Error: Please enter valid numerical values for pay and rates.")

if __name__ == "__main__":
    main()