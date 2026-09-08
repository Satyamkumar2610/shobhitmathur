import requests
import json
import re

grounding_urls = {
    "SM-002": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFCZCxyrStzd5cw3vZtxLDBtneYR2wiI4ciwSJh02iCcMSE1UuglHgsAjYTAD0eW0VvcIob61kO2XcfACr35xfjuLBgUGgXWYX4Oai9tnDAVWcwM_yiUtCX5X7-rZ49tSX-tObOEGuFTAufqr1wnzjjIPIl8gv2H-Xe2jAUWczuM294SVeud1O8vmFuygk61pHklSj9pqLm2z_qEaAo3tE2plHXzVtcDEV5uXV0LFd-JHU5txSN0wXBEGgUm0uxCY0Gw5Im8dU3lfv_u24XgNCZfDoWl-lFCk7G",
    "SM-003": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEM-a8BDH8_Peg_DOfgTWRz4ndiefri9ckDGWhmszIVqXqP0oEbffrMGJMc4jhgjJdaBvEI4jnwsmhBxt6KZZ120r8AIL5XytpyupeIseGaDy6U6jhWYwJszPsVFHYtnCGWa8GSvt2-JV-PIBKbF0VR1YM5RPwpavOTQoB4-YI=",
    "SM-004": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHbfkzZqRs7EOZXOh9q0cyIxeElqQ8U10HD5EBKhP-Ox4kGzh2btOelSupC_2aZ01YIYRowvsIC4SxaYkmXo9Pj75dFzG6BTWe2tQJBc2gYinJozOhzT4SL7ZsKB6a0CkPYK22iiqYvqE3HqNH7MUQwAjpRaINd4ZmPQ9bkGOHoHRvauNbUJgQVRQ==",
    "SM-005": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvBneZYX2VZgaHMbvrxRCvWk48FTHI6UVTjiUf163KuAi0Q9TOYWqdabWiMtsKe73eZY-ZQbLLqKuXXi1st78XV4PLu9V_MHgsiXY4Oftv2GHW54P5SU3orRvN7SwCB7sb7LYldCq9SIjjjuKRtSPmxrPe_kkbx1Ou1_q522G0cBC-xyXTx_T54eiK73M5RdfGVrjRZRbuJq-Lo9IEVp6Vm4VGhXzYvAgSCNw2qtB5KP00",
    "SM-006": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEg0pBIiXv0Pqy0c3bb5pmxlpC00yNdvVREYLIAs998mD03cSLZv0SOBYjqzhS3cLOWDed_T8bdRWC_pF3EyKbZAvJlc93IwboHjbdPTjGG5PUvXGOJ3Epr5q8BXwk5jTwaCGTtPMIORrqKtSPLKb7FsE1BbSMMNXZq_rDLgMnfEA2TxSVIT1hMQWCz94FK-gSDtISS3BoAd0LiPgN80XST7VbQ6faiih8e3J3-2x36UO_ValyJppw=",
    "SM-007": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFzvjAYXNT_-LG30l24LgWW8f6f4p2KN2WCzgNTQt2LWmwFQWAnizcF6_mU2XAt5QFrrIOCEcws-m7IRcmImk9bX9j4uNVHpCjZEey971AHoyFHd3eEaob8S6hHJjF3rVQ-I40ZNdmoKXVyVXj7klgl1fjhveK4TI6WYYD7kLIFWu7TI_gD6lEu41d0EKXKKHjZpcBK1aC8YF3LHs2Jsod_1KrGlz1c8X5Gf9mcZpetSg==",
    "SM-008": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAIcKLl9cIK1lIBoNahmNoK2SjaNIezaSZ1y7Px2u7DsSd6_tNzIGl5ax_25cQ6mxuZi30RAKoqjj070YPagWlqAccqqjqOgqxudsgGoDp8E691VICLV-2_6fJYtarTUgYYTt-ZA5McBtk1wZ2_0fFkucTwYBtQE-S8hHHVpo6HIEgmXuG6iK1eYY=",
    "SM-009": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_08NXbwltUKHKSSHCFS0oClcolKg4ZzTcRJa8NAsvtjZB5zUDIu3q6Hj0r_HfgACZYkanFrZw9c_T-sGOlK1uJswxwCMC1ZpTfBE6DqFzXdd0CT5U69gucEQ2on05-nKTzMIJHdiSVLJkMaJPwTz_LRztjZTXeb8iogiG6eCNJQhPJHrdA8yfLWZIsxAIGRdcUsHy9bOh0hLWJOjYXdGqu8vzfaNjb7Jvs45l_NmRuw==",
    "SM-010": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF6qWpLGK_U32Mann1HGDsslw06w5qv8RKrfHNZDSSD7edELRNXxI5UDfDY8wItkg_7EGZRGSKJs5DFsX_qO9JGee-rLBUmdODL2CGJ5PpHlQHQoron8dXGo4WSHLzF6grCEJMxLpMFCmYgIabSwfSugjxCJ0HLKh7R9ywGLQumztv8lEEizjuHfcLDKVHRkvyCmYCoPm9bJtP0Yio9QWEY4qpydYyVa5oOifPnWtMC3hPFG0Yv-8Bz1zv3nWhm5ryep0xqnxZiSQ==",
    "SM-011": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFxe9MxAWMnePLui6NdOBqKyb-UZKl1NoFh8gHujzjfa6FYzobjtONLLimOXqypZnhPW0mr4xO52IHW6vuPXnsdnH_d9WEvhVs1qX_KYaoRj3DqM5Up_M7jyE-wruKCEZ2_44KBrcb7eg8LhLmLWNaqhHCP1zaQ3w3oD6csJSD8tR5TJa7Qa9OD0HtTwG0kK2_lrbeezAJClWebHFY16Z8=",
    "SM-012": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFK2Y91zJlE_7-UAhphjjIqTDMzgfbcWoiyPcOt3HIBvJXTAGu-yfDvzMoYF_PHqTTWDiKPNIWQSHDmwo14S-WShfc5x0lEfKOiHY3H2JkUKoDQygcMyuj0OKFFwb8st6cYmJiE7iKYosa9mv6LxH-lIK-ykkxv0fQDWRYRrxY6NCbfBNiFqpuJClDQ_1bYec-Bd2HSIL63v1D_j5mKGenhV0jE",
    "SM-013": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGpw4LfncKSgdNFyIN7eiIMvLXTLSKJV3k-UMeZMHv8eGCKJizgXZMkw22C4xTiNY2vnn6N0t43YBftfXg7D5bTCqIeMZqV2XiFG-OaVnZmdUMRjE5uXPdyxpFJCf69luxfXk4tFDb3nBFMEtAGLNhL2dVltuS5dSGAW0weh2n_VcN86MGV84NKfw7pGWIGERim9_WisSySFFs_ZEhE46ofV7O804edHZFynQhLsJoG29OOzO9xOgQ=",
    "SM-014": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwxyGTI4MIxHk2-A3ZU-fr668_bhpb32KjT0NzHlh8kwfAnThD0yO3m4_Vc8DrJUIRbqdgGo6nyXxeAmVwQaADCkY6vFbXldxaOEfwMr-9g4wHGnXnYOgwXq_REc9dVEDBNwLUdT4MQ1HhgmdWBOIEyEwOHfqtNM5RdHPfyY_0etiWCuwSGBCNG-th9UbKGhUF16wPVwtzo_YGUEXIj3oh7Ld4mrIU3mTICdYva_6zaIp4qXW80INPfMQ=",
    "SM-017": "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFp6D92NatH-sOqJ1h4UvjN5eBRNon4-fjUvT39k0WRqmKEU8VGSvZVDhvWjDvs3kCJgapOTmb3dmcPbcIA9Cp6znwKUyGvr5hGpzHLXifbHVG6XpHGnzSgSsYfb1K3Tp-V1UdcAGF4UWK81K--8Susg3jouGU7U9xDWok18qWB2PUB8wKy-u5jiCOq3rIA1H_xE2-YeoKdC7zXWJGydnvfiUlwfiGZi77cNumWSoA-8_eODszKMZRkgaI="
}

final_urls = {}

for id_, g_url in grounding_urls.items():
    try:
        r = requests.get(g_url, allow_redirects=False)
        if r.status_code == 302:
            loc = r.headers.get('Location')
            if loc:
                final_urls[id_] = loc
                print(f"Resolved {id_} -> {loc}")
    except Exception as e:
        print(f"Failed {id_}: {e}")

# Now inject these into create_master_sheet.py
with open("create_master_sheet.py", "r") as f:
    content = f.read()

for id_, loc in final_urls.items():
    # Find the block for this ID
    # example: "ID": "SM-002",
    #          "Article Title": ...
    # We want to replace the "Article URL": "..." line inside that block
    pattern = rf'("ID": "{id_}",.*?)"Article URL": ".*?"'
    replacement = rf'\1"Article URL": "{loc}"'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("create_master_sheet.py", "w") as f:
    f.write(content)

print(f"Successfully patched create_master_sheet.py with {len(final_urls)} clean URLs.")
