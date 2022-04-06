select "countries"."name" as "countryName",
count("cities"."name") as "cityCount"
from "countries"
join "cities" using ("countryId")
group by "countryName"
