const Charts = {
  barChart(container, data, options = {}) {
    const {
      width = 310,
      height = 180,
      barColor = '#3b1e5e',
      optimalMin = 65,
      optimalMax = 85,
      showLabels = true,
      onBarClick = null
    } = options;

    const padding = { top: 20, right: 10, bottom: 30, left: 10 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const barW = chartW / data.length * 0.5;
    const gap = chartW / data.length;
    const maxVal = 100;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

    // Optimal zone
    const optMinY = padding.top + chartH * (1 - optimalMin / maxVal);
    const optMaxY = padding.top + chartH * (1 - optimalMax / maxVal);
    svg += `<rect x="${padding.left}" y="${optMaxY}" width="${chartW}" height="${optMinY - optMaxY}" fill="#f0f5ed" rx="4"/>`;
    svg += `<text x="${width - padding.right}" y="${optMaxY + 12}" font-size="9" fill="#3b1e5e" text-anchor="end" font-family="Inter, sans-serif">OPTIMAL</text>`;

    // Bars
    data.forEach((d, i) => {
      const x = padding.left + i * gap + (gap - barW) / 2;
      const barH = (d.value / maxVal) * chartH;
      const y = padding.top + chartH - barH;
      const isToday = i === data.length - 1;
      const fill = isToday ? '#3b1e5e' : '#9b7fb8';
      const radius = 4;

      svg += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${fill}" rx="${radius}"
        ${onBarClick ? `onclick="${onBarClick}(${i})" style="cursor:pointer"` : ''}/>`;

      if (showLabels) {
        svg += `<text x="${x + barW / 2}" y="${height - 8}" font-size="10" fill="${isToday ? '#3b1e5e' : '#9b7fb8'}"
          text-anchor="middle" font-weight="${isToday ? '600' : '400'}" font-family="Inter, sans-serif">${d.day}</text>`;
      }
    });

    svg += '</svg>';
    container.innerHTML = svg;
  },

  pieChart(container, segments, options = {}) {
    const { size = 120, innerRadius = 0 } = options;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;
    const ir = innerRadius;

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    let startAngle = -90;

    segments.forEach(seg => {
      const angle = (seg.value / 100) * 360;
      const endAngle = startAngle + angle;
      const path = Charts.describeArc(cx, cy, r, ir, startAngle, endAngle);
      svg += `<path d="${path}" fill="${seg.color}"/>`;
      startAngle = endAngle;
    });

    svg += '</svg>';
    container.innerHTML = svg;
  },

  donutChart(container, segments, centerText, options = {}) {
    const { size = 120 } = options;
    Charts.pieChart(container, segments, { size, innerRadius: size / 2 - 20 });

    // Add center text
    const svg = container.querySelector('svg');
    const cx = size / 2;
    const cy = size / 2;
    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textEl.setAttribute('x', cx);
    textEl.setAttribute('y', cy + 4);
    textEl.setAttribute('text-anchor', 'middle');
    textEl.setAttribute('font-size', '11');
    textEl.setAttribute('font-weight', '600');
    textEl.setAttribute('fill', '#1A2E1A');
    textEl.setAttribute('font-family', 'Inter, sans-serif');
    textEl.textContent = centerText;
    svg.appendChild(textEl);
  },

  lineChart(container, data, options = {}) {
    const {
      width = 310,
      height = 140,
      color = '#2D4A2D',
      fillColor = 'rgba(45,74,45,0.1)',
      showDots = true
    } = options;

    const padding = { top: 16, right: 16, bottom: 8, left: 16 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...data) * 1.1;
    const minVal = Math.min(...data) * 0.9;
    const range = maxVal - minVal;

    const points = data.map((v, i) => ({
      x: padding.left + (i / (data.length - 1)) * chartW,
      y: padding.top + chartH - ((v - minVal) / range) * chartH
    }));

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;

    // Fill area
    const fillPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    svg += `<path d="${fillPath} L${points[points.length - 1].x},${padding.top + chartH} L${points[0].x},${padding.top + chartH} Z" fill="${fillColor}"/>`;

    // Line
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    svg += `<path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

    // Dots
    if (showDots) {
      points.forEach(p => {
        svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="white" stroke="${color}" stroke-width="2"/>`;
      });
    }

    svg += '</svg>';
    container.innerHTML = svg;
  },

  describeArc(cx, cy, outerR, innerR, startAngle, endAngle) {
    const start1 = Charts.polarToCartesian(cx, cy, outerR, endAngle);
    const end1 = Charts.polarToCartesian(cx, cy, outerR, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    if (innerR === 0) {
      return `M ${cx} ${cy} L ${end1.x} ${end1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${start1.x} ${start1.y} Z`;
    }

    const start2 = Charts.polarToCartesian(cx, cy, innerR, endAngle);
    const end2 = Charts.polarToCartesian(cx, cy, innerR, startAngle);

    return `M ${end1.x} ${end1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${start1.x} ${start1.y} L ${start2.x} ${start2.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${end2.x} ${end2.y} Z`;
  },

  polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }
};
