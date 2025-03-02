SELECT 
    e.id,
    e.nik,
    e.name,
    e.is_active,
    p.gender,
	AGE(CURRENT_DATE, p.date_of_birth) AS age,
    edu.name AS school_name,
    edu.level,
    COALESCE(
        STRING_AGG(CONCAT(fm.count_relation, ' ', fm.relation_status), ', '), 
        '-'
    ) AS family_data
FROM employee e
JOIN employee_profile p ON e.id = p.employee_id
LEFT JOIN education edu ON e.id = edu.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        relation_status,
        COUNT(*) AS count_relation
    FROM employee_family
    GROUP BY employee_id, relation_status
) fm ON e.id = fm.employee_id
WHERE e.is_active = TRUE
GROUP BY e.id, edu.id, p.id;


