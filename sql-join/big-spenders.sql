select "customers"."firstName",
"customers"."lastName",
"payments"."amount"
from "customers"
join "payments" using ("customerId")
order by "payments"."amount"
limit 10;
