// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.querySelector('.sidebar');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Bar chart data and animation
const barChartData = [
    { month: 'Jul', value: 3200 },
    { month: 'Aug', value: 4100 },
    { month: 'Sep', value: 3800 },
    { month: 'Oct', value: 4500 },
    { month: 'Nov', value: 3900 },
    { month: 'Dec', value: 4280 }
];

function createBarChart() {
    const barChart = document.getElementById('barChart');
    const tooltip = document.getElementById('barTooltip');
    const maxValue = Math.max(...barChartData.map(item => item.value));
    
    barChartData.forEach((item, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(item.value / maxValue) * 100}%`;
        bar.setAttribute('data-month', item.month);
        bar.setAttribute('data-value', item.value);
        bar.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover events for tooltip
        bar.addEventListener('mouseenter', (e) => {
            tooltip.textContent = `${item.month}: $${item.value.toLocaleString()}`;
            tooltip.classList.add('show');
            
            const rect = bar.getBoundingClientRect();
            const chartRect = barChart.getBoundingClientRect();
            tooltip.style.left = `${rect.left - chartRect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - chartRect.top - 10}px`;
        });
        
        bar.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
        
        barChart.appendChild(bar);
    });
}

// Pie chart animation and tooltip
function animatePieChart() {
    const pieChart = document.getElementById('pieChart');
    const tooltip = document.getElementById('pieTooltip');
    const legendItems = document.querySelectorAll('.legend-item');
    
    // Pie chart data
    const pieData = [
        { label: 'Food & Dining', value: 1580, color: '#3B82F6', startAngle: 0, endAngle: 126 },
        { label: 'Transportation', value: 850, color: '#10B981', startAngle: 126, endAngle: 187 },
        { label: 'Bills & Utilities', value: 1200, color: '#F59E0B', startAngle: 187, endAngle: 274 },
        { label: 'Entertainment', value: 450, color: '#EF4444', startAngle: 274, endAngle: 313 },
        { label: 'Shopping', value: 200.75, color: '#8B5CF6', startAngle: 313, endAngle: 360 }
    ];
    
    // Add hover events to pie chart
    pieChart.addEventListener('mousemove', (e) => {
        const rect = pieChart.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left - centerX;
        const y = e.clientY - rect.top - centerY;
        
        const angle = Math.atan2(y, x) * 180 / Math.PI;
        const normalizedAngle = (angle + 360) % 360;
        
        let hoveredSlice = null;
        
        pieData.forEach(slice => {
            if (normalizedAngle >= slice.startAngle && normalizedAngle < slice.endAngle) {
                hoveredSlice = slice;
            }
        });
        
        if (hoveredSlice) {
            tooltip.textContent = `${hoveredSlice.label}: $${hoveredSlice.value.toLocaleString()}`;
            tooltip.classList.add('show');
            tooltip.style.left = `${e.clientX - rect.left}px`;
            tooltip.style.top = `${e.clientY - rect.top - 10}px`;
        }
    });
    
    pieChart.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
    });
    
    // Add stagger animation to legend items
    legendItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.animation = `slideInUp 0.6s ease forwards`;
        item.style.animationDelay = `${1.8 + (index * 0.1)}s`;
    });
}

// Create Line Chart (Income vs Expenses)
function createLineChart() {
    const lineChart = document.getElementById('lineChart');
    const tooltip = document.getElementById('lineTooltip');
    
    const lineData = [
        { month: 'Jul', income: 8200, expense: 4100 },
        { month: 'Aug', income: 8400, expense: 4300 },
        { month: 'Sep', income: 8100, expense: 3900 },
        { month: 'Oct', income: 8600, expense: 4200 },
        { month: 'Nov', income: 8300, expense: 4000 },
        { month: 'Dec', income: 8420, expense: 4280 }
    ];
    
    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Create paths
    const incomePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const expensePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    let incomePathData = '';
    let expensePathData = '';
    
    lineData.forEach((point, index) => {
        const x = (index / (lineData.length - 1)) * 90 + 5; // 5% margin
        const incomeY = 90 - ((point.income - 7800) / 1000) * 70; // Scale to fit
        const expenseY = 90 - ((point.expense - 3500) / 1000) * 70;
        
        const command = index === 0 ? 'M' : 'L';
        incomePathData += `${command} ${x}% ${incomeY}%`;
        expensePathData += `${command} ${x}% ${expenseY}%`;
        
        // Create data points
        const incomePoint = document.createElement('div');
        incomePoint.className = 'chart-point';
        incomePoint.style.left = `${x}%`;
        incomePoint.style.top = `${incomeY}%`;
        incomePoint.style.borderColor = '#10B981';
        incomePoint.dataset.month = point.month;
        incomePoint.dataset.value = point.income;
        incomePoint.dataset.type = 'Income';
        
        const expensePoint = document.createElement('div');
        expensePoint.className = 'chart-point';
        expensePoint.style.left = `${x}%`;
        expensePoint.style.top = `${expenseY}%`;
        expensePoint.style.borderColor = '#EF4444';
        expensePoint.dataset.month = point.month;
        expensePoint.dataset.value = point.expense;
        expensePoint.dataset.type = 'Expense';
        
        // Add hover events
        [incomePoint, expensePoint].forEach(point => {
            point.addEventListener('mouseenter', (e) => {
                const value = parseInt(point.dataset.value);
                const percentage = point.dataset.type === 'Income' ? 
                    ((value - 8000) / 8000 * 100).toFixed(1) : 
                    ((value - 4000) / 4000 * 100).toFixed(1);
                const trend = percentage > 0 ? '↗' : '↘';
                tooltip.innerHTML = `
                    <strong>${point.dataset.month} ${point.dataset.type}</strong><br>
                    Amount: $${value.toLocaleString()}<br>
                    Change: ${trend} ${Math.abs(percentage)}%
                `;
                tooltip.classList.add('show');
                
                const rect = lineChart.getBoundingClientRect();
                tooltip.style.left = `${e.clientX - rect.left}px`;
                tooltip.style.top = `${e.clientY - rect.top - 10}px`;
            });
            
            point.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
        
        lineChart.appendChild(incomePoint);
        lineChart.appendChild(expensePoint);
    });
    
    incomePath.setAttribute('d', incomePathData);
    incomePath.setAttribute('stroke', '#10B981');
    incomePath.className = 'chart-line';
    
    expensePath.setAttribute('d', expensePathData);
    expensePath.setAttribute('stroke', '#EF4444');
    expensePath.className = 'chart-line';
    expensePath.style.animationDelay = '0.5s';
    
    svg.appendChild(incomePath);
    svg.appendChild(expensePath);
    lineChart.appendChild(svg);
}

// Create Area Chart (Savings Growth)
function createAreaChart() {
    const areaChart = document.getElementById('areaChart');
    const tooltip = document.getElementById('areaTooltip');
    
    const savingsData = [
        { month: 'Jul', value: 2500, goal: 3000 },
        { month: 'Aug', value: 2800, goal: 3200 },
        { month: 'Sep', value: 3200, goal: 3400 },
        { month: 'Oct', value: 3600, goal: 3600 },
        { month: 'Nov', value: 4100, goal: 3800 },
        { month: 'Dec', value: 4500, goal: 4000 }
    ];
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    
    let pathData = 'M 5% 95%'; // Start from bottom left
    let lineData = '';
    
    savingsData.forEach((point, index) => {
        const x = (index / (savingsData.length - 1)) * 90 + 5;
        const y = 90 - ((point.value - 2000) / 3500) * 70;
        
        if (index === 0) {
            lineData = `M ${x}% ${y}%`;
        } else {
            lineData += ` L ${x}% ${y}%`;
        }
        pathData += ` L ${x}% ${y}%`;
        
        // Create point
        const pointEl = document.createElement('div');
        pointEl.className = 'chart-point';
        pointEl.style.left = `${x}%`;
        pointEl.style.top = `${y}%`;
        pointEl.style.borderColor = '#8B5CF6';
        pointEl.dataset.month = point.month;
        pointEl.dataset.value = point.value;
        pointEl.dataset.goal = point.goal;
        
        pointEl.addEventListener('mouseenter', (e) => {
            const progress = ((point.value / point.goal) * 100).toFixed(1);
            const status = point.value >= point.goal ? '✅ Goal Achieved' : '📈 In Progress';
            tooltip.innerHTML = `
                <strong>${point.month} Savings</strong><br>
                Saved: $${point.value.toLocaleString()}<br>
                Goal: $${point.goal.toLocaleString()}<br>
                Progress: ${progress}%<br>
                Status: ${status}
            `;
            tooltip.classList.add('show');
            
            const rect = areaChart.getBoundingClientRect();
            tooltip.style.left = `${e.clientX - rect.left}px`;
            tooltip.style.top = `${e.clientY - rect.top - 10}px`;
        });
        
        pointEl.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
        
        areaChart.appendChild(pointEl);
    });
    
    pathData += ' L 95% 95% Z'; // Close the path
    
    // Create gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'areaGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#8B5CF6');
    stop1.setAttribute('stop-opacity', '0.6');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#8B5CF6');
    stop2.setAttribute('stop-opacity', '0.1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    
    // Create area
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    area.setAttribute('d', pathData);
    area.setAttribute('fill', 'url(#areaGradient)');
    area.className = 'chart-area';
    
    // Create line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', lineData);
    line.setAttribute('stroke', '#8B5CF6');
    line.className = 'chart-line';
    
    svg.appendChild(defs);
    svg.appendChild(area);
    svg.appendChild(line);
    areaChart.appendChild(svg);
}

// Create Multi-Line Chart (Category Spending Trends)
function createMultiLineChart() {
    const multiChart = document.getElementById('multiLineChart');
    const tooltip = document.getElementById('multiTooltip');
    
    const categories = {
        food: { 
            data: [1200, 1350, 1180, 1420, 1380, 1580], 
            color: '#3B82F6', 
            name: 'Food & Dining',
            budget: 1400,
            transactions: [45, 52, 41, 48, 46, 53]
        },
        transport: { 
            data: [650, 720, 680, 750, 800, 850], 
            color: '#10B981', 
            name: 'Transportation',
            budget: 800,
            transactions: [12, 15, 13, 16, 18, 20]
        },
        bills: { 
            data: [1100, 1150, 1080, 1200, 1180, 1200], 
            color: '#F59E0B', 
            name: 'Bills & Utilities',
            budget: 1250,
            transactions: [8, 9, 7, 10, 9, 8]
        },
        entertainment: { 
            data: [300, 420, 380, 450, 400, 450], 
            color: '#EF4444', 
            name: 'Entertainment',
            budget: 500,
            transactions: [15, 22, 18, 25, 21, 24]
        }
    };
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    
    Object.entries(categories).forEach(([categoryKey, category], categoryIndex) => {
        let pathData = '';
        
        category.data.forEach((value, index) => {
            const x = (index / (category.data.length - 1)) * 90 + 5;
            const y = 90 - ((value - 200) / 1500) * 70;
            
            const command = index === 0 ? 'M' : 'L';
            pathData += `${command} ${x}% ${y}%`;
            
            // Create points
            const point = document.createElement('div');
            point.className = 'chart-point';
            point.style.left = `${x}%`;
            point.style.top = `${y}%`;
            point.style.borderColor = category.color;
            point.dataset.category = category.name;
            point.dataset.month = months[index];
            point.dataset.value = value;
            point.dataset.budget = category.budget;
            point.dataset.transactions = category.transactions[index];
            
            point.addEventListener('mouseenter', (e) => {
                const budgetStatus = value > category.budget ? '⚠️ Over Budget' : '✅ Within Budget';
                const budgetDiff = Math.abs(value - category.budget);
                const avgPerTransaction = (value / category.transactions[index]).toFixed(2);
                
                tooltip.innerHTML = `
                    <strong>${months[index]} ${category.name}</strong><br>
                    Spent: $${value.toLocaleString()}<br>
                    Budget: $${category.budget.toLocaleString()}<br>
                    Difference: $${budgetDiff.toLocaleString()}<br>
                    Transactions: ${category.transactions[index]}<br>
                    Avg/Transaction: $${avgPerTransaction}<br>
                    ${budgetStatus}
                `;
                tooltip.classList.add('show');
                
                const rect = multiChart.getBoundingClientRect();
                tooltip.style.left = `${e.clientX - rect.left}px`;
                tooltip.style.top = `${e.clientY - rect.top - 10}px`;
            });
            
            point.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
            
            multiChart.appendChild(point);
        });
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', category.color);
        path.className = 'chart-line';
        path.style.animationDelay = `${categoryIndex * 0.3}s`;
        
        svg.appendChild(path);
    });
    
    multiChart.appendChild(svg);
}

// Analytics controls
function setupAnalyticsControls() {
    const analyticsButtons = document.querySelectorAll('.analytics-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    analyticsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            analyticsButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Number animation for cards
function animateNumbers() {
    const amounts = document.querySelectorAll('.card .amount');
    
    amounts.forEach(amount => {
        const target = parseFloat(amount.textContent.replace(/[$,]/g, ''));
        const isNegative = amount.textContent.includes('-');
        const prefix = isNegative ? '-$' : '$';
        
        let current = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            amount.textContent = prefix + Math.floor(current).toLocaleString() + 
                                (target % 1 !== 0 ? '.' + (target % 1).toFixed(2).slice(2) : '');
        }, 16);
    });
}

// Table row animation
function animateTableRows() {
    const rows = document.querySelectorAll('.transactions-table tbody tr');
    
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.animation = `slideInUp 0.6s ease forwards`;
        row.style.animationDelay = `${1.2 + (index * 0.1)}s`;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Responsive chart resizing
function handleResize() {
    if (window.innerWidth <= 768) {
        const pieChart = document.getElementById('pieChart');
        if (pieChart) {
            pieChart.style.width = '120px';
            pieChart.style.height = '120px';
        }
    } else {
        const pieChart = document.getElementById('pieChart');
        if (pieChart) {
            pieChart.style.width = '200px';
            pieChart.style.height = '200px';
        }
    }
}

// Table sorting functionality
function sortTable(column) {
    const table = document.querySelector('.transactions-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aVal = a.cells[column].textContent.trim();
        const bVal = b.cells[column].textContent.trim();
        
        if (column === 3) {
            const aNum = parseFloat(aVal.replace(/[$,]/g, ''));
            const bNum = parseFloat(bVal.replace(/[$,]/g, ''));
            return aNum - bNum;
        }
        
        return aVal.localeCompare(bVal);
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

// Add click handlers to table headers
document.querySelectorAll('.transactions-table th').forEach((th, index) => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => sortTable(index));
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create charts
    createBarChart();
    animatePieChart();
    
    // Create mixed analytics charts with delay
    setTimeout(() => {
        createLineChart();
        createAreaChart();
        createMultiLineChart();
    }, 1000);
    
    // Setup controls
    setupAnalyticsControls();
    
    // Animate numbers after a delay
    setTimeout(animateNumbers, 800);
    
    // Animate table rows
    setTimeout(animateTableRows, 1200);
    
    // Set up resize handler
    window.addEventListener('resize', handleResize);
    handleResize();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.card, .chart-container, .transactions-section').forEach(el => {
    observer.observe(el);
});