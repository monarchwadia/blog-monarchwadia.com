# Purpose:
# This script creates an HTML file with an embedded SVG representation of 
# layers of abstraction in computing, from physics (low-level) to application (high-level).

# Define the layers from bottom (Physics) to top (Application)
levels = [
    ("Physics", "#8A2BE2"),                      # Purple
    ("Devices (Transistors)", "#0000CD"),        # Dark Blue
    ("Gates/Registers", "#0000FF"),              # Blue
    ("Micro Architecture", "#00BFFF"),           # Light Blue
    ("Instruction Set Architecture", "#008000"),  # Green
    ("Machine Code", "#90EE90"),                 # Light Green
    ("Assembly Language", "#FFFF00"),            # Yellow
    ("Programming Language", "#FFA500"),         # Orange
    ("Algorithm", "#FF0000"),                    # Red
    ("Application", "#B22222"),                  # Dark Red
]

# SVG dimensions and settings
svg_width = 800
svg_height = 800
margin = 50
block_width = 500
block_height = 50
gap = 10
total_blocks_height = len(levels) * (block_height + gap) - gap

# Calculate positions
left_margin = margin
top_margin = margin
hardware_software_divide = 5 * (block_height + gap)

# HTML and SVG Generation
html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layers of Abstraction</title>
    <style>
        body {{ font-family: Arial, Helvetica, sans-serif; text-align: center; }}
        .container {{ max-width: 900px; margin: 0 auto; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Layers of Abstraction in Computing</h1>
        <svg width="{svg_width}" height="{svg_height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Main Title -->
            <text x="{svg_width/2}" y="{top_margin - 20}" 
                  text-anchor="middle" font-weight="bold" font-size="20">
                Layers of Abstraction
            </text>
'''

# Add the rectangular blocks
for i, (label, color) in enumerate(levels):
    y = top_margin + i * (block_height + gap)
    text_color = 'white' if i in [0, 1, 2, 8, 9] else 'black'
    
    html_content += f'''
            <!-- Block for {label} -->
            <rect x="{left_margin}" y="{y}" width="{block_width}" height="{block_height}" 
                  fill="{color}" stroke="white" stroke-width="2" />
            <text x="{left_margin + block_width/2}" y="{y + block_height/2}" 
                  text-anchor="middle" dominant-baseline="middle" 
                  fill="{text_color}" font-weight="bold" font-size="16">
                {label}
            </text>
'''

# Add the hardware/software dividing line
hw_sw_line_y = top_margin + hardware_software_divide
html_content += f'''
            <!-- Hardware/Software Dividing Line -->
            <line x1="{left_margin}" y1="{hw_sw_line_y}" 
                  x2="{left_margin + block_width}" y2="{hw_sw_line_y}" 
                  stroke="black" stroke-width="2" />
'''

# Add side labels and arrows
complexity_y = top_margin + total_blocks_height / 2
arrow_start_y = top_margin + total_blocks_height * 0.9
arrow_end_y = top_margin + total_blocks_height * 0.1

# Left side - Complexity arrow (pointing down)
html_content += f'''
            <!-- Complexity Label and Arrow -->
            <text x="{left_margin - 30}" y="{complexity_y}" 
                  transform="rotate(270, {left_margin - 30}, {complexity_y})"
                  text-anchor="middle" font-weight="bold" font-size="14">
                Increasing order of Complexity
            </text>
            <path d="M {left_margin - 30} {arrow_start_y} 
                     L {left_margin - 30} {arrow_end_y + 10}
                     L {left_margin - 35} {arrow_end_y + 10} 
                     L {left_margin - 30} {arrow_end_y} 
                     L {left_margin - 25} {arrow_end_y + 10} 
                     L {left_margin - 30} {arrow_end_y + 10}" 
                  fill="black" />
'''

# Left side - Abstraction arrow (pointing up)
html_content += f'''
            <!-- Abstraction Label and Arrow -->
            <text x="{left_margin - 80}" y="{complexity_y}" 
                  transform="rotate(270, {left_margin - 80}, {complexity_y})"
                  text-anchor="middle" font-weight="bold" font-size="14">
                Increasing order of Abstraction
            </text>
            <path d="M {left_margin - 80} {arrow_end_y} 
                     L {left_margin - 80} {arrow_start_y - 10}
                     L {left_margin - 85} {arrow_start_y - 10} 
                     L {left_margin - 80} {arrow_start_y} 
                     L {left_margin - 75} {arrow_start_y - 10} 
                     L {left_margin - 80} {arrow_start_y - 10}" 
                  fill="black" />
'''

# Right side - Hardware and Software labels and arrows
hardware_y = top_margin + hardware_software_divide / 2
software_y = top_margin + (hardware_software_divide + total_blocks_height) / 2
right_x = left_margin + block_width + 80

html_content += f'''
            <!-- Hardware Label and Arrow -->
            <text x="{right_x}" y="{hardware_y}" 
                  transform="rotate(90, {right_x}, {hardware_y})"
                  text-anchor="middle" font-weight="bold" font-size="16">
                Hardware
            </text>
            <path d="M {right_x} {top_margin + 10} 
                     L {right_x} {hw_sw_line_y - 10}
                     L {right_x - 5} {hw_sw_line_y - 10} 
                     L {right_x} {hw_sw_line_y} 
                     L {right_x + 5} {hw_sw_line_y - 10} 
                     L {right_x} {hw_sw_line_y - 10}" 
                  fill="black" />
                  
            <!-- Software Label and Arrow -->
            <text x="{right_x}" y="{software_y}" 
                  transform="rotate(90, {right_x}, {software_y})"
                  text-anchor="middle" font-weight="bold" font-size="16">
                Software
            </text>
            <path d="M {right_x} {hw_sw_line_y + 10} 
                     L {right_x} {top_margin + total_blocks_height - 10}
                     L {right_x - 5} {top_margin + total_blocks_height - 10} 
                     L {right_x} {top_margin + total_blocks_height} 
                     L {right_x + 5} {top_margin + total_blocks_height - 10} 
                     L {right_x} {top_margin + total_blocks_height - 10}" 
                  fill="black" />
'''

# Close the SVG and HTML tags
html_content += '''
        </svg>
    </div>
</body>
</html>
'''

# Write to an HTML file
with open('abstraction_layers.html', 'w') as f:
    f.write(html_content)

print("Saved as ./abstraction_layers.html")
