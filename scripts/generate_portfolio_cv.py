"""Create the public, company-neutral CV from the portfolio's verified facts."""

from pathlib import Path


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "Ahmed_Badr_Shaaban.pdf"
commands = []


def text(x, y, value, size=10, bold=False, color=(0.13, 0.14, 0.13)):
    escaped = value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    commands.append(
        f"{color[0]} {color[1]} {color[2]} rg BT /{'F2' if bold else 'F1'} {size} Tf "
        f"1 0 0 1 {x} {y} Tm ({escaped}) Tj ET"
    )


def line(y):
    commands.append(f"0.88 0.88 0.86 RG 48 {y} m 564 {y} l S")


def section(y, title):
    text(48, y, title.upper(), 10, True, (0.85, 0.35, 0.25))
    line(y - 9)


text(48, 744, "Ahmed Badr Shaaban", 22, True)
text(48, 725, "Frontend Engineer | Angular Developer", 11)
text(48, 704, "Cairo, Egypt  |  +20 110 048 6283  |  ahmedbadrr417@gmail.com", 9)
text(48, 690, "github.com/AhmedBadrShaban  |  linkedin.com/in/ahmedbshaban", 9)

section(663, "Profile")
text(48, 638, "Frontend engineer with nearly two years of production Angular experience across", 10)
text(48, 624, "e-commerce, trading, billing dashboards, and financial compliance systems.", 10)
text(48, 610, "Focused on accessible, responsive, bilingual interfaces and dependable delivery.", 10)

section(581, "Experience")
text(48, 555, "Front End Developer (Angular)", 11, True)
text(422, 555, "Jan 2025 - Present", 9)
text(48, 538, "Built Angular interfaces for e-commerce, trading, enterprise billing, and KYC workflows.", 9)
text(48, 524, "Integrated REST, WebSocket, and SSE APIs; worked with SSR, analytics, and CI/CD.", 9)
text(48, 510, "Created responsive, accessible Arabic/English RTL components.", 9)
text(48, 482, "Angular Developer Intern | Link Development", 11, True)
text(434, 482, "Jul - Sep 2022", 9)
text(48, 465, "Built responsive, accessible Angular and TypeScript modules in an Agile team.", 9)

section(434, "Selected freelance project")
text(48, 408, "Beauty Clinic Web Application", 11, True)
text(48, 391, "Independently designed, developed, and deployed a responsive appointments and", 9)
text(48, 377, "services platform using Angular, TypeScript, and REST APIs.", 9)

section(346, "Education")
text(48, 320, "B.Sc. Computer Science | Cairo University", 10, True)
text(48, 304, "Faculty of Computers and Artificial Intelligence | Sep 2019 - May 2023 | Very Good", 9)
text(48, 279, "Web Design Diploma | Digital Egypt Youth Program, NTI", 10, True)
text(48, 263, "Mar - Jul 2023 | 120-hour program | Score: 90%", 9)

section(232, "Skills")
text(48, 206, "Angular, TypeScript, JavaScript ES6+, RxJS, NgRx, Angular SSR, HTML5, CSS3, Sass", 9)
text(48, 191, "Tailwind CSS, Zard UI, responsive design, WCAG accessibility, Arabic/English RTL", 9)
text(48, 176, "Node.js, Express, REST APIs, WebSockets, SSE, MySQL, Postman, Jasmine", 9)
text(48, 161, "Git/GitHub, Azure, CI/CD collaboration, Agile/Scrum, SEO, GA4, Google Tag Manager", 9)

stream = "\n".join(commands).encode("ascii")
objects = [
    b"<< /Type /Catalog /Pages 2 0 R >>",
    b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    f"<< /Length {len(stream)} >>\nstream\n".encode("ascii") + stream + b"\nendstream",
]
document = bytearray(b"%PDF-1.4\n")
offsets = [0]
for number, obj in enumerate(objects, 1):
    offsets.append(len(document))
    document.extend(f"{number} 0 obj\n".encode("ascii") + obj + b"\nendobj\n")
xref = len(document)
document.extend(f"xref\n0 {len(offsets)}\n0000000000 65535 f \n".encode("ascii"))
for offset in offsets[1:]:
    document.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
document.extend(f"trailer\n<< /Size {len(offsets)} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF".encode("ascii"))
OUTPUT.write_bytes(document)
